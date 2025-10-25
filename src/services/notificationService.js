// src/services/notificationService.js
class NotificationService {
  constructor() {
    this.permission = null;
    this.isSupported = 'Notification' in window;
    this.init();
  }

  async init() {
    if (this.isSupported) {
      this.permission = Notification.permission;
    }
  }

  // Request permission from user
  async requestPermission() {
    if (!this.isSupported) {
      console.warn('Notifications not supported in this browser');
      return false;
    }

    try {
      const permission = await Notification.requestPermission();
      this.permission = permission;
      return permission === 'granted';
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    }
  }

  // Send a notification
  async sendNotification(title, options = {}) {
    if (!this.isSupported || this.permission !== 'granted') {
      return false;
    }

    const notificationOptions = {
      icon: '/icon-192x192.png',
      badge: '/badge-72x72.png',
      ...options
    };

    try {
      const registration = await navigator.serviceWorker?.ready;
      if (registration && 'showNotification' in registration) {
        // Use service worker for PWA notifications
        await registration.showNotification(title, notificationOptions);
      } else {
        // Use browser notifications as fallback
        new Notification(title, notificationOptions);
      }
      return true;
    } catch (error) {
      console.error('Error sending notification:', error);
      return false;
    }
  }

  // Send breaking news notification
  async sendBreakingNews(article) {
    const biasType = this.getBiasType(article.leaning);
    const biasEmoji = this.getBiasEmoji(biasType);
    
    return this.sendNotification(`🚨 ${article.title}`, {
      body: `Coverage: ${biasEmoji} ${biasType}-leaning • ${article.source?.name || 'Multiple sources'}`,
      tag: `news-${article.id}`,
      requireInteraction: true,
      actions: [
        {
          action: 'read',
          title: 'Read Article'
        },
        {
          action: 'compare',
          title: 'Compare Coverage'
        }
      ],
      data: {
        articleId: article.id,
        url: `/article/${article.id}`
      }
    });
  }

  // Send bias alert notification
  async sendBiasAlert(article, conflictingArticles) {
    return this.sendNotification('🎯 Bias Alert', {
      body: `This story has conflicting coverage across ${conflictingArticles.length} sources with different perspectives`,
      tag: `bias-alert-${article.id}`,
      icon: '/bias-alert.png'
    });
  }

  // Send weekly digest
  async sendWeeklyDigest(savedCount, topics) {
    return this.sendNotification('📰 Your Weekly News Digest', {
      body: `You saved ${savedCount} articles last week. Top topics: ${topics.slice(0, 3).join(', ')}`,
      tag: 'weekly-digest',
      requireInteraction: false
    });
  }

  // Helper methods
  getBiasType(leaning) {
    const { left, center, right } = leaning;
    if (left >= center && left >= right) return 'left';
    if (center >= left && center >= right) return 'center';
    return 'right';
  }

  getBiasEmoji(biasType) {
    const emojis = {
      left: '⬅️',
      center: '⚪',
      right: '➡️'
    };
    return emojis[biasType] || '📰';
  }

  // Check if notifications are enabled
  isEnabled() {
    return this.isSupported && this.permission === 'granted';
  }
}

// Create singleton instance
const notificationService = new NotificationService();
export default notificationService;