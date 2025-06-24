const book = document.getElementById('book');
const pageCounter = document.getElementById('pageCounter');
let currentPage = 1;
const totalPages = 100;
const pages = [];

// Auto-generate 100 pages
for (let i = 1; i <= totalPages; i++) {
  const page = document.createElement('div');
  page.className = 'page';
  page.style.display = i === 1 ? 'block' : 'none'; // show only first page
  page.setAttribute('data-page', i);

  // Top editable text block
  const textBox = document.createElement('div');
  textBox.className = 'top-text';
  textBox.contentEditable = true;
  textBox.innerText = `Page ${i} Text Here`;

  // Image area
  const imgContainer = document.createElement('div');
  imgContainer.className = 'image-blocks';

  const container = document.createElement('div');
  container.className = 'image-container';

  const img = document.createElement('img');
  img.src = 'https://via.placeholder.com/300x300?text=Add+Image';

  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*';
  fileInput.id = `imageUploadInput${i}`;

  // Load selected image
  fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

  // Upload label button
  const label = document.createElement('label');
  label.className = 'upload-label';
  label.setAttribute('for', fileInput.id);
  label.innerText = 'Add Image';

  // Delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-image-btn';
  deleteBtn.type = 'button';
  deleteBtn.innerText = 'Delete Image';
  deleteBtn.addEventListener('click', () => {
    img.src = 'https://via.placeholder.com/300x300?text=Add+Image';
    fileInput.value = '';
  });

  // Assemble components
  container.appendChild(img);
  container.appendChild(fileInput);
  container.appendChild(label);
  container.appendChild(deleteBtn);
  imgContainer.appendChild(container);
  page.appendChild(textBox);
  page.appendChild(imgContainer);
  book.appendChild(page);
  pages.push(page);
}

// Page display handler
function showPage(num) {
  pages.forEach((p, i) => {
    p.style.display = (i + 1 === num) ? 'block' : 'none';
  });
  pageCounter.textContent = `Page ${num} of ${totalPages}`;
}

// Navigation buttons
document.getElementById('nextPage').addEventListener('click', () => {
  if (currentPage < totalPages) {
    currentPage++;
    showPage(currentPage);
  }
});

document.getElementById('prevPage').addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    showPage(currentPage);
  }
});

// Download current page as PNG (hide buttons first)
document.getElementById('downloadPageBtn').addEventListener('click', () => {
  const page = pages[currentPage - 1];
  const toHide = page.querySelectorAll('.upload-label, .delete-image-btn');
  toHide.forEach(el => el.style.display = 'none');

  html2canvas(page, { backgroundColor: '#000' }).then((canvas) => {
    toHide.forEach(el => el.style.display = '');
    const link = document.createElement('a');
    link.download = `page-${currentPage}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  });
});

// Change background image for current page
document.getElementById('changeBackgroundInput').addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      pages[currentPage - 1].style.background = `url('${e.target.result}') center/contain no-repeat`;
    };
    reader.readAsDataURL(file);
  }
});
