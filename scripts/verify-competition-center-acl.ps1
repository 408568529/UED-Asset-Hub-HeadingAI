$ErrorActionPreference='Stop'
$helper=Join-Path $PSScriptRoot 'competition-center-private.ps1'
$scope=Join-Path ([IO.Path]::GetTempPath()) ('ued-center-acl-'+[guid]::NewGuid())
$root=Join-Path $scope '.launch-center'
$sid=[Security.Principal.WindowsIdentity]::GetCurrent().User.Value
function Set-FixtureAcl {
 $acl=[Security.AccessControl.DirectorySecurity]::new()
 $acl.SetSecurityDescriptorSddlForm(('O:{0}G:{0}D:P(A;OICI;FA;;;{0})(A;OICI;FA;;;SY)(A;OICI;FA;;;BA)(A;OICI;GR;;;BU)' -f $sid))
 Set-Acl -LiteralPath $root -AclObject $acl
}
function Expect-PrivateFailure([scriptblock]$action) {
 $failed=$false
 try { & $action } catch { if($_.Exception.Message -notmatch 'not private'){throw};$failed=$true }
 if(-not $failed){throw 'Expected broad permissions to be rejected'}
}
try {
 New-Item -ItemType Directory -Path $root | Out-Null
 & $helper -Path $root -Initialize
 & $helper -Path $root
 Set-FixtureAcl
 Expect-PrivateFailure { & $helper -Path $root }
 & $helper -Path $root -InitializeIfEmpty
 & $helper -Path $root
 & $helper -Path $root -InitializeIfEmpty
 $state=Join-Path $root 'control.json'
 [IO.File]::WriteAllText($state,'')
 & $helper -Path $root -ProtectState
 [IO.File]::WriteAllText($state,'synthetic-preserve')
 & $helper -Path $root -InitializeIfEmpty
 Set-FixtureAcl
 $before=(Get-Acl -LiteralPath $root).Sddl
 Expect-PrivateFailure { & $helper -Path $root -InitializeIfEmpty }
 if((Get-Acl -LiteralPath $root).Sddl -ne $before -or [IO.File]::ReadAllText($state) -ne 'synthetic-preserve'){throw 'Existing state or ACL was changed'}
 Write-Output 'PASS: empty directory recovery, repeat initialization, state protection, nonempty rejection and preservation.'
} finally {
 if(Test-Path -LiteralPath $scope){Remove-Item -LiteralPath $scope -Recurse -Force}
}
