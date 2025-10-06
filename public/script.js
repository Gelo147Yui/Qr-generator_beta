const qrText = document.getElementById('qrText');
const qrColor = document.getElementById('qrColor');
const qrSize = document.getElementById('qrSize');
const generateBtn = document.getElementById('generateBtn');
const downloadBtn = document.getElementById('downloadBtn');
const qrPreview = document.getElementById('qrPreview');

let currentCanvas = null;

// Генерация QR-кода
generateBtn.addEventListener('click', async () => {
  const text = qrText.value.trim();
  if (!text) {
    alert('Введите текст или URL!');
    return;
  }

  qrPreview.innerHTML = '';

  const qrcode = new QRCode(qrPreview, {
    text: text,
    width: parseInt(qrSize.value),
    height: parseInt(qrSize.value),
    colorDark: qrColor.value,
    colorLight: "#ffffff"
  });

  // Получаем canvas для скачивания
  setTimeout(() => {
    currentCanvas = qrPreview.querySelector('canvas');
    downloadBtn.disabled = false;
  }, 300);

  // Отправляем историю на сервер
  await fetch('/history', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text,
      date: new Date().toISOString().split('T')[0],
      params: { color: qrColor.value, size: qrSize.value }
    })
  });
});

// Скачивание PNG
downloadBtn.addEventListener('click', () => {
  if (!currentCanvas) return;
  const link = document.createElement('a');
  link.download = 'qr-code.png';
  link.href = currentCanvas.toDataURL();
  link.click();
});
