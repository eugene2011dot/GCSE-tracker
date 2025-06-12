// Backup System Core
(function() {
    // 1. Backup Creator (for internal local backups)
    const createBackup = () => {
      const backupData = {};
      for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          // Only backup the primary data keys for internal backups,
          // exclude other _backup_ keys themselves to prevent backups of backups.
          if (!key.startsWith('_backup_')) {
              backupData[key] = localStorage.getItem(key);
          }
      }
      localStorage.setItem(`_backup_${Date.now()}`, JSON.stringify(backupData));

      // Keep only last 3 backups (sort numerically by timestamp)
      const allBackups = Object.keys(localStorage)
        .filter(k => k.startsWith('_backup_'))
        .sort((a, b) => {
            const timestampA = parseInt(a.split('_')[1]); // Extract timestamp for numerical sort
            const timestampB = parseInt(b.split('_')[1]);
            return timestampA - timestampB;
        });

      // If more than 3 backups, remove the oldest one(s)
      while (allBackups.length > 3) {
        localStorage.removeItem(allBackups.shift()); // Remove the oldest from the start of the sorted array
      }

      // Update UI for last backup time (if the function is available)
      if (typeof updateBackupTime === 'function') {
          updateBackupTime();
      }
    };

    // 2. Auto-Recovery
    const checkDataIntegrity = () => {
      // Check if 'userData' (or any critical core data key) exists to determine integrity
      if (!localStorage.getItem('userData')) {
        const lastBackup = Object.keys(localStorage)
          .filter(k => k.startsWith('_backup_'))
          .sort((a, b) => {
            const timestampA = parseInt(a.split('_')[1]);
            const timestampB = parseInt(b.split('_')[1]);
            return timestampA - timestampB;
          })
          .pop(); // Get the most recent internal backup

        if (lastBackup) {
          try {
            const restoredData = JSON.parse(localStorage.getItem(lastBackup));
            // Restore all items from the last internal backup
            for (const key in restoredData) {
                localStorage.setItem(key, restoredData[key]);
            }
            console.log("Auto-restored data from:", lastBackup);
            location.reload(); // Reload to apply restored data
          } catch (error) {
            console.error("Error parsing or restoring auto-backup:", error);
            // Optionally, add user feedback or clear corrupted backup here
          }
        }
      }
    };

    // 3. Connect UI Buttons
    document.getElementById('exportBtn')?.addEventListener('click', () => {
      const allLocalStorageData = {};
      for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          // Exclude internal _backup_ keys from the exported file to avoid confusion
          if (!key.startsWith('_backup_')) {
              allLocalStorageData[key] = localStorage.getItem(key);
          }
      }

      // Create a Blob from the collected data and trigger a download
      // JSON.stringify(..., null, 2) makes the JSON output pretty-printed for readability
      const blob = new Blob([JSON.stringify(allLocalStorageData, null, 2)], {type: 'application/json'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `backup_${new Date().toISOString().slice(0,10)}.json`; // Dynamic filename with current date
      a.click();

      URL.revokeObjectURL(url); // Clean up the URL object after download

      createBackup(); // Also create a fresh local backup when exporting
      alert('Backup created and downloaded! A local backup was also made.');
    });

    document.getElementById('importBackup')?.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (!file) return; // If no file selected, do nothing

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target.result);

          if (confirm('Restore this backup? This will overwrite ALL your current data with the backup\'s content.')) {
            // OPTIONAL: Preserve current internal _backup_ keys before clearing
            // This ensures your internal history isn't lost during an import
            const backupKeysToPreserve = Object.keys(localStorage).filter(k => k.startsWith('_backup_'));
            const backupsToPreserveData = {};
            backupKeysToPreserve.forEach(key => {
                backupsToPreserveData[key] = localStorage.getItem(key);
            });

            localStorage.clear(); // Clear EVERYTHING from localStorage

            // Restore the internal backups first
            for (const key in backupsToPreserveData) {
                localStorage.setItem(key, backupsToPreserveData[key]);
            }

            // Now restore all data from the imported file
            for (const key in importedData) {
                localStorage.setItem(key, importedData[key]);
            }

            alert('Data restored successfully! Page will refresh.');
            location.reload(); // Reload to apply the restored data
          }
        } catch (error) {
          alert('Invalid backup file or an error occurred during restore.');
          console.error("Error during import process:", error);
        } finally {
            // Reset the file input to allow re-importing the same file
            e.target.value = '';
        }
      };
      reader.readAsText(file); // Read the selected file as text
    });

    // 4. Initialize
    // Run auto-recovery on page load to check data integrity
    checkDataIntegrity();
    // Create or update an internal backup on initial load (or periodically)
    createBackup();
    // If you had a setInterval for createBackup, ensure it calls this updated function.
    // Example: setInterval(createBackup, 300000); // Create a backup every 5 minutes
})();