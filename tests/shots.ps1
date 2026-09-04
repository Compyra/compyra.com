$ErrorActionPreference = 'Stop'
$root = 'c:\Temp\Git\compyra.com'
$server = Start-Process -FilePath 'python' -ArgumentList @('-m', 'http.server', '8746', '--bind', '127.0.0.1') -WorkingDirectory $root -PassThru -WindowStyle Hidden
Start-Sleep -Milliseconds 1200
try {
  $edge = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
  if (-not (Test-Path $edge)) { $edge = 'C:\Program Files\Microsoft\Edge\Application\msedge.exe' }
  $shots = @(
    @{ url = 'http://127.0.0.1:8746/tests/light.html?to=/'; out = 'q-home-light.png'; w = 1440; h = 2300 },
    @{ url = 'http://127.0.0.1:8746/about/'; out = 'q-about.png'; w = 1440; h = 3400 },
    @{ url = 'http://127.0.0.1:8746/nl/'; out = 'q-nl-home-mobile.png'; w = 500; h = 2600 }
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
