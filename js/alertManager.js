class AlertManager {
    constructor() {
      if (AlertManager.instance) return AlertManager.instance;
      AlertManager.instance = this;
  
      this.alertContainer = document.createElement('div');
      this.alertContainer.id = 'alert-container';
      document.body.appendChild(this.alertContainer);
    }
  
    showAlert(message, type = 'info', duration = 3000) {
      const alert = document.createElement('div');
      alert.className = `alert alert-${type}`;
      alert.innerText = message;
  
      this.alertContainer.appendChild(alert);

      requestAnimationFrame(() => alert.classList.add('visible'));

      setTimeout(() => {
        alert.classList.remove('visible');
        alert.addEventListener('transitionend', () => alert.remove());
      }, duration);
    }
  }
  

  const alertManager = new AlertManager();
  export default alertManager;
  