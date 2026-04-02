document.addEventListener('DOMContentLoaded', async () => {
  // Get stored notification count
  const data = await chrome.storage.local.get(['notificationCount', 'notifications']);
  const count = data.notificationCount || 0;
  
  document.getElementById('count').textContent = count;
  
  // Display notifications
  if (data.notifications && data.notifications.length > 0) {
    const list = document.getElementById('notification-list');
    data.notifications.forEach(notif => {
      const item = document.createElement('div');
      item.className = 'notification-item';
      item.textContent = notif;
      list.appendChild(item);
    });
  }
});

// Open LinkedIn
document.getElementById('open-linkedin').addEventListener('click', () => {
  chrome.tabs.create({ url: 'https://www.linkedin.com' });
});

// Clear notifications
document.getElementById('clear-notifications').addEventListener('click', () => {
  chrome.storage.local.set({ notificationCount: 0, notifications: [] });
  document.getElementById('count').textContent = '0';
  document.getElementById('notification-list').innerHTML = '';
});