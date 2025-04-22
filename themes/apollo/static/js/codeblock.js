const successIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="bi bi-check-lg" viewBox="0 0 16 16">
            <path d="M13.485 1.85a.5.5 0 0 1 1.065.02.75.75 0 0 1-.02 1.065L5.82 12.78a.75.75 0 0 1-1.106.02L1.476 9.346a.75.75 0 1 1 1.05-1.07l2.74 2.742L12.44 2.92a.75.75 0 0 1 1.045-.07z"/>
        </svg>`;
const errorIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="bi bi-x-lg" viewBox="0 0 16 16">
            <path d="M2.293 2.293a1 1 0 0 1 1.414 0L8 6.586l4.293-4.293a1 1 0 0 1 1.414 1.414L9.414 8l4.293 4.293a1 1 0 0 1-1.414 1.414L8 9.414l-4.293 4.293a1 1 0 0 1-1.414-1.414L6.586 8 2.293 3.707a1 1 0 0 1 0-1.414z"/>
        </svg>`;

const copyIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="bi bi-clipboard" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
            <path d="M384 336l-192 0c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l140.1 0L400 115.9 400 320c0 8.8-7.2 16-16 16zM192 384l192 0c35.3 0 64-28.7 64-64l0-204.1c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1L192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-32-48 0 0 32c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l32 0 0-48-32 0z"/>
        </svg>
`

// Function to change icons after copying
const changeIcon = (button, isSuccess) => {
    button.innerHTML = isSuccess ? successIcon : errorIcon;
    setTimeout(() => {
        button.innerHTML = copyIcon; // Reset to copy icon
    }, 2000);
};

// Function to get code text from tables, skipping line numbers
const getCodeFromTable = (codeBlock) => {
    return [...codeBlock.querySelectorAll('tr')]
        .map(row => row.querySelector('td:last-child')?.innerText ?? '')
        .join('');
};

// Function to get code text from non-table blocks
const getNonTableCode = (codeBlock) => {
    return codeBlock.textContent.trim();
};

document.addEventListener('DOMContentLoaded', function () {
    // Select all `pre` elements containing `code`

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const pre = entry.target.parentNode;
            const clipboardBtn = pre.querySelector('.clipboard-button');
            const label = pre.querySelector('.code-label');

            if (clipboardBtn) {
                // Adjust the position of the clipboard button when the `code` is not fully visible
                clipboardBtn.style.right = entry.isIntersecting ? '5px' : `-${entry.boundingClientRect.right - pre.clientWidth + 5}px`;
            }

            if (label) {
                // Adjust the position of the label similarly
                label.style.right = entry.isIntersecting ? '0px' : `-${entry.boundingClientRect.right - pre.clientWidth}px`;
            }
        });
    }, {
        root: null, // observing relative to viewport
        rootMargin: '0px',
        threshold: 1.0 // Adjust this to control when the callback fires
    });

    document.querySelectorAll('pre code').forEach(codeBlock => {
        const pre = codeBlock.parentNode;
        pre.style.position = 'relative'; // Ensure parent `pre` can contain absolute elements

        // 加入新的一層處理 mac-style codeblock
        const div = document.createElement('div');
        div.className = 'code-div';

        // 加入 div
        pre.parentNode.insertBefore(div, pre);
        div.appendChild(pre);

        // Create and append the copy button
        const copyBtn = document.createElement('button');
        copyBtn.className = 'clipboard-button';
        copyBtn.innerHTML = copyIcon;
        copyBtn.setAttribute('aria-label', 'Copy code to clipboard');
        pre.appendChild(copyBtn);

        // Attach event listener to copy button
        copyBtn.addEventListener('click', async () => {
            // Determine if the code is in a table or not
            const isTable = codeBlock.querySelector('table');
            const codeToCopy = isTable ? getCodeFromTable(codeBlock) : getNonTableCode(codeBlock);
            try {
                await navigator.clipboard.writeText(codeToCopy);
                changeIcon(copyBtn, true); // Show success icon
            } catch (error) {
                console.error('Failed to copy text: ', error);
                changeIcon(copyBtn, false); // Show error icon
            }
        });

        const langClass = codeBlock.className.match(/language-(\w+)/);
        const lang = langClass ? langClass[1] : 'default';

        // Create and append the label
        const label = document.createElement('span');
        label.className = 'code-label label-' + lang; // Use the specific language class
        label.textContent = lang.toUpperCase(); // Display the language as label
        pre.appendChild(label);

        let ticking = false;
        pre.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    copyBtn.style.right = `-${pre.scrollLeft}px`;
                    label.style.right = `-${pre.scrollLeft}px`;
                    ticking = false;
                });
                ticking = true;
            }
        });

    });
});
