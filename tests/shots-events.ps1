$ErrorActionPreference = 'Stop'
$root = 'c:\Temp\Git\compyra.com'
$server = Start-Process -FilePath 'python' -ArgumentList @('-m', 'http.server', '8748', '--bind', '127.0.0.1') -WorkingDirectory $root -PassThru -WindowStyle Hidden
Start-Sleep -Milliseconds 1200
try {
  $edge = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
  if (-not (Test-Path $edge)) { $edge = 'C:\Program Files\Microsoft\Edge\Application\msedge.exe' }
  $shots = @(
    @{ url = 'http://127.0.0.1:8748/certifications/'; out = 'e-certs.png'; w = 1440; h = 4400 },
    @{ url = 'http://127.0.0.1:8748/fr/certifications/'; out = 'e-fr-certs-mobile.png'; w = 500; h = 5600 }
  )
  foreach ($s in $shots) {
    $prof = Join-Path $env:TEMP ("edgeshot-" + [guid]::NewGuid().ToString('N'))
    $out = Join-Path $env:TEMP $s.out
    if (Test-Path $out) { Remove-Item $out -Force }
    $a = @('--headless=new', '--disable-gpu', '--no-sandbox', '--hide-scrollbars',
      "--window-size=$($s.w),$($s.h)", "--user-data-dir=$prof", '--virtual-time-budget=12000',
      "--screenshot=$out", $s.url)
    Start-Process -FilePath $edge -ArgumentList $a -Wait -NoNewWindow
    Remove-Item $prof -Recurse -Force -ErrorAction SilentlyContinue
    Write-Output ("{0}: {1} bytes" -f $s.out, (Get-Item $out).Length)
  }
}
finally {
  if ($server -and -not $server.HasExited) { Stop-Process -Id $server.Id -Force }
}
