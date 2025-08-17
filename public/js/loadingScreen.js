
const loadingCSS = `
<style id="loading-styles">
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: none;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  backdrop-filter: blur(1px);
}

.loading-content {
  padding: 30px;
  border-radius: 15px;
  text-align: center;
  max-width: 300px;
  width: 90%;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

.loading-text {
  color: #333;
  font-size: 16px;
  font-weight: 500;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-overlay.show {
  display: flex;
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
`;

const loadingHTML = `
<div id="loading-overlay" class="loading-overlay">
  <div class="loading-content">
    <div class="loading-spinner"></div>
    <p class="loading-text">Processing...</p>
  </div>
</div>
`;

// Đợi DOM sẵn sàng rồi mới thêm CSS và HTML vào
document.addEventListener('DOMContentLoaded', () => {
  document.head.insertAdjacentHTML('beforeend', loadingCSS);
  document.body.insertAdjacentHTML('beforeend', loadingHTML);
});

function showLoadingScreen() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
      overlay.classList.add('show');
      document.body.style.overflow = 'hidden';
    }
  }

  function hideLoadingScreen() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
      overlay.classList.remove('show');
      document.body.style.overflow = '';
    }
  }
