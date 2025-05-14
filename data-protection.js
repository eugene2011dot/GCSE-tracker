// Backup System Core
(function() {
    // 1. Backup Creator
    const createBackup = () => {
      const backup = {
        userData: JSON.parse(localStorage.getItem('userData')) || {},
        settings: localStorage.getItem('userSettings')
      };
      
      localStorage.setItem(`_backup_${Date.now()}`, JSON.stringify(backup));
      
      // Keep only last 3 backups
      const allBackups = Object.keys(localStorage)
        .filter(k => k.startsWith('_backup_'))
        .sort()
        .slice(-3);
      
      if (allBackups.length > 3) {
        localStorage.removeItem(allBackups[0]);
      }
      
      updateBackupTime(); // Update UI
    };
  
    // 2. Auto-Recovery
    const checkDataIntegrity = () => {
      if (!localStorage.getItem('userData')) {
        const lastBackup = Object.keys(localStorage)
          .filter(k => k.startsWith('_backup_'))
          .sort()
          .pop();
        
        if (lastBackup) {
          const { userData, settings } = JSON.parse(localStorage.getItem(lastBackup));
          localStorage.setItem('userData', JSON.stringify(userData));
          if (settings) localStorage.setItem('userSettings', settings);
          location.reload();
        }
      }
    };
  
    // 3. Connect UI Buttons
    document.getElementById('exportBtn')?.addEventListener('click', () => {
      const data = {
        userData: JSON.parse(localStorage.getItem('userData')),
        settings: localStorage.getItem('userSettings')
      };
      
      const blob = new Blob([JSON.stringify(data)], {type: 'application/json'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `backup_${new Date().toISOString().slice(0,10)}.json`;
      a.click();
      
      createBackup(); // Also create local backup
    });
  
    document.getElementById('importBackup')?.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const { userData, settings } = JSON.parse(e.target.result);
          if (confirm('Restore this backup?')) {
            localStorage.setItem('userData', JSON.stringify(userData));
            if (settings) localStorage.setItem('userSettings', settings);
            alert('Restored! Page will refresh.');
            location.reload();
          }
        } catch {
          alert('Invalid backup file');
        }
      };
      reader.readAsText(file);
    });
  
    // 4. Initialize
    createBackup(); // First run
    setInterval(createBackup, 30 * 60 * 1000); // Every 30 minutes
    setInterval(checkDataIntegrity, 60 * 1000); // Every minute
  })();