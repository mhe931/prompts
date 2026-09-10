---
name: Windows Idle-Prevention Mouse Jiggler Script
description: Generate a Windows batch launcher and PowerShell script that subtly moves the mouse to prevent idle/lock without disrupting active user input.
tags: [automation, powershell, windows, utility-script]
category: other
---

## GOAL

Produce a small Windows utility, consisting of a batch launcher and a PowerShell script, that periodically nudges the mouse cursor to prevent the system from going idle, while never overriding genuine user activity.

## CONTEXT

The utility runs on a Windows machine and must work unattended in the background. It consists of two files: a .bat launcher that changes to a working directory and invokes the PowerShell script with an execution-policy bypass, and a .ps1 script that performs the cursor movement using System.Windows.Forms and System.Drawing.

## GUARDRAILS

- Never move the mouse during a cycle if the user has already moved it since the last check; skip that cycle instead.
- Keep movements small and always restore the cursor to its original position at the end of each cycle.
- Do not perform any action other than cursor movement and an optional harmless keypress (for example F15) to signal activity.
- Do not log, transmit, or store any information about user activity beyond what is needed to run the loop.

## EXECUTION

1. Batch launcher: set the working directory to the script install location and invoke the PowerShell script with -ExecutionPolicy Bypass -File.
2. PowerShell script:
   - load System.Windows.Forms and System.Drawing;
   - loop indefinitely until interrupted (Ctrl+C);
   - remember the cursor current position, wait a random 15-30 seconds, then re-check the position;
   - if the user moved the mouse during the wait, skip the rest of the cycle;
   - otherwise move the cursor by two small random offsets with short random pauses between moves, then return it to the original position;
   - optionally send a harmless keypress (for example F15) to register activity.

## VERIFICATION

Confirm the script never fights the user own mouse movement, always restores the original position after a cycle, and can be stopped cleanly with Ctrl+C. Test manually by running the batch file and observing that manual mouse movement during the wait window skips a cycle.

## OUTPUT FORMAT

Return exactly two files, each in its own fenced code block with the correct language tag, ready to save and run as-is:

Reference implementation - launcher.bat:

```bat
@echo off
cd "C:\Users\k430533\Documents\impdocs"

powershell.exe -ExecutionPolicy Bypass -File ".\mouseMove.ps1"
```

Reference implementation - mouseMove.ps1:

```powershell
Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

$rand = New-Object System.Random

Write-Host "Mouse mover running. Press Ctrl+C to stop."

while ($true) {

    # Remember current mouse position
    $startPos = [System.Windows.Forms.Cursor]::Position

    # Wait 15-30 seconds
    $waitSeconds = $rand.Next(15, 31)
    Start-Sleep -Seconds $waitSeconds

    # If user moved the mouse during the wait, skip this cycle
    $currentPos = [System.Windows.Forms.Cursor]::Position

    if ($currentPos.X -ne $startPos.X -or $currentPos.Y -ne $startPos.Y) {
        continue
    }

    # Generate random offsets
    $dx1 = $rand.Next(-120, 121)
    $dy1 = $rand.Next(-120, 121)

    $dx2 = $rand.Next(-80, 81)
    $dy2 = $rand.Next(-80, 81)

    # Move mouse
    [System.Windows.Forms.Cursor]::Position =
        New-Object System.Drawing.Point(
            ($startPos.X + $dx1),
            ($startPos.Y + $dy1)
        )

    Start-Sleep -Milliseconds ($rand.Next(80, 220))

    [System.Windows.Forms.Cursor]::Position =
        New-Object System.Drawing.Point(
            ($startPos.X + $dx2),
            ($startPos.Y + $dy2)
        )

    Start-Sleep -Milliseconds ($rand.Next(80, 220))

    # Return to original position
    [System.Windows.Forms.Cursor]::Position = $startPos

    # Optional keypress
    [System.Windows.Forms.SendKeys]::SendWait("{F15}")
}
```
