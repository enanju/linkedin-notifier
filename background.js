// Check LinkedIn for new notifications every 5 minutes
chrome.alarms.create('checkLinkedIn', { periodInMinutes: 5 });

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'checkLinkedIn') {
    checkNotifications();
  }
});

// Check on extension startup
checkNotifications();

async function checkNotifications() {
  try {
    // Fetch LinkedIn notifications
    const response = await fetch('https://www.linkedin.com/notifications/', {
      credentials: 'include'
    });
    
    if (response.ok) {
      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      
      // Extract notification count (adjust selector based on LinkedIn's current structure)
      const countElement = doc.querySelector('[data-badge]');
      const count = countElement ? parseInt(countElement.textContent) : 0;
      
      // Update storage and badge
      await chrome.storage.local.set({ notificationCount: count });
      chrome.action.setBadgeText({ text: count > 0 ? count.toString() : '' });
      chrome.action.setBadgeBackgroundColor({ color: '#0a66c2' });
    }
  } catch (error) {
    console.error('Error checking notifications:', error);
  }
}