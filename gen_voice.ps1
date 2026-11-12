$outDir = "C:\Users\pc\Documents\Trae-CN\temp_20261024_01\voice"
$script = "C:\Users\pc\Documents\Trae-CN\temp_20261024_01\voice_script.json"

if (!(Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir | Out-Null }
$data = Get-Content -Path $script -Encoding UTF8 -Raw | ConvertFrom-Json

Add-Type -AssemblyName System.Speech

foreach ($seg in $data) {
  $s = New-Object System.Speech.Synthesis.SpeechSynthesizer
  $voice = $s.GetInstalledVoices() | Where-Object { $_.VoiceInfo.Language -match "zh" } | Select-Object -First 1
  if ($voice) { $s.SelectVoice($voice.VoiceInfo.Name) }
  $out = Join-Path $outDir ("seg" + $seg.id + ".wav")
  $s.SetOutputToWaveFile($out)
  $s.Speak($seg.text)
  $s.Dispose()
  $dur = [math]::Round((Get-Item $out).Length / 1KB, 1)
  Write-Host ("OK seg{0}.wav  {1} KB  [{2}]" -f $seg.id, $dur, $seg.title)
}
Write-Host "全部音频生成完成"
