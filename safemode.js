// Safe Mode functionality
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const safeModeToggle = document.getElementById('safe-mode-toggle');
    const censorshipBubble = document.getElementById('censorship-bubble');
    const revertBtn = document.getElementById('revert-btn');
    const closeBubbleBtn = document.getElementById('close-bubble-btn');
    const censorshipReason = document.getElementById('censorship-reason');
    const nrTitleBadge = document.getElementById('nr-title-badge');
    const titleBubble = document.getElementById('title-bubble');
    const closeTitleBubbleBtn = document.getElementById('close-title-bubble-btn');
    
    // State management
    let isSafeModeActive = false;
    let currentCensoredElement = null;
    
    // Censorship reasons
    const censorshipReasons = {
        'victim-blaming': 'Nội dung này đã được ẩn do có thể chứa ngôn từ gây tổn thương hoặc đổ lỗi cho nạn nhân.',
        'hate-speech': 'Nội dung này đã được ẩn do có thể chứa ngôn từ thù địch hoặc kỳ thị.',
        'inappropriate': 'Nội dung này đã được ẩn do không phù hợp với tiêu chuẩn cộng đồng.'
    };

    // Initialize Safe Mode
    function initSafeMode() {
        // Set up toggle button
        safeModeToggle.addEventListener('click', toggleSafeMode);
        
        // Set up sensitive content icons
        const sensitiveIcons = document.querySelectorAll('.sensitive-icon');
        sensitiveIcons.forEach(icon => {
            icon.addEventListener('click', handleSensitiveIconClick);
        });
        
        // Set up bubble buttons
        revertBtn.addEventListener('click', handleRevert);
        closeBubbleBtn.addEventListener('click', closeBubble);
        
        // Set up NR title badge
        if (nrTitleBadge) {
            nrTitleBadge.addEventListener('click', handleTitleBadgeClick);
        }
        
        // Set up title bubble buttons
        if (closeTitleBubbleBtn) {
            closeTitleBubbleBtn.addEventListener('click', closeTitleBubble);
        }
        
        // Close bubble when clicking outside
        document.addEventListener('click', handleOutsideClick);
        
        // Keyboard support
        document.addEventListener('keydown', handleKeydown);
        
        console.log('Safe Mode initialized');
    }

    // Toggle Safe Mode on/off
    function toggleSafeMode() {
        isSafeModeActive = !isSafeModeActive;
        
        if (isSafeModeActive) {
            activateSafeMode();
        } else {
            deactivateSafeMode();
        }
        
        updateToggleButton();
        console.log('Safe Mode:', isSafeModeActive ? 'ON' : 'OFF');
    }

    // Activate Safe Mode
    function activateSafeMode() {
        document.body.classList.add('safe-mode-active');
        
        // Reset any individually reverted items when activating
        const revertedItems = document.querySelectorAll('.censored-comment.reverted');
        revertedItems.forEach(item => {
            item.classList.remove('reverted');
        });
        
        // Setup censored content
        setupCensoredContent();
    }

    // Deactivate Safe Mode
    function deactivateSafeMode() {
        document.body.classList.remove('safe-mode-active');
        closeBubble();
    }

    // Update toggle button appearance
    function updateToggleButton() {
        if (isSafeModeActive) {
            safeModeToggle.classList.add('active');
            safeModeToggle.title = 'Tắt Safe Mode';
        } else {
            safeModeToggle.classList.remove('active');
            safeModeToggle.title = 'Bật Safe Mode';
        }
    }

    // Setup censored content - full comment approach
    function setupCensoredContent() {
        const censoredComments = document.querySelectorAll('.censored-comment');
        
        censoredComments.forEach(comment => {
            const censoredMask = comment.querySelector('.censored-mask');
            const originalText = comment.dataset.original;
            
            if (censoredMask && originalText) {
                // Copy the original comment text to the mask
                censoredMask.textContent = originalText;
            }
        });
    }

    // Handle sensitive content icon clicks
    function handleSensitiveIconClick(event) {
        event.preventDefault();
        event.stopPropagation();
        
        const icon = event.currentTarget;
        const censoredComment = icon.closest('.censored-comment');
        
        if (!censoredComment) return;
        
        currentCensoredElement = censoredComment;
        showCensorshipBubble(icon, censoredComment);
    }

    // Show censorship explanation bubble
    function showCensorshipBubble(icon, censoredElement) {
        const reason = censoredElement.dataset.reason || 'inappropriate';
        const reasonText = censorshipReasons[reason] || censorshipReasons['inappropriate'];
        
        censorshipReason.textContent = reasonText;
        
        // Position bubble near the icon
        const iconRect = icon.getBoundingClientRect();
        const bubbleWidth = 320;
        const bubbleHeight = 200; // approximate
        
        let left = iconRect.right + 10;
        let top = iconRect.top - 50;
        
        // Adjust if bubble would go off screen
        if (left + bubbleWidth > window.innerWidth) {
            left = iconRect.left - bubbleWidth - 10;
        }
        
        if (top < 10) {
            top = 10;
        }
        
        if (top + bubbleHeight > window.innerHeight) {
            top = window.innerHeight - bubbleHeight - 10;
        }
        
        censorshipBubble.style.left = left + 'px';
        censorshipBubble.style.top = top + 'px';
        censorshipBubble.style.display = 'block';
        
        // Position the arrow
        const arrow = censorshipBubble.querySelector('::before');
        if (left < iconRect.left) {
            // Bubble is to the left of icon
            censorshipBubble.style.setProperty('--arrow-position', 'right');
            censorshipBubble.classList.add('arrow-right');
        } else {
            // Bubble is to the right of icon
            censorshipBubble.style.setProperty('--arrow-position', 'left');
            censorshipBubble.classList.remove('arrow-right');
        }
        
        // Focus management
        revertBtn.focus();
    }

    // Handle revert button click
    function handleRevert() {
        if (currentCensoredElement) {
            currentCensoredElement.classList.add('reverted');
            console.log('Reverted censorship for:', currentCensoredElement.dataset.original);
            console.log('Element classes:', currentCensoredElement.className);
            
            // Force a reflow to ensure styles are applied
            currentCensoredElement.offsetHeight;
        }
        closeBubble();
    }

    // Close censorship bubble
    function closeBubble() {
        censorshipBubble.style.display = 'none';
        currentCensoredElement = null;
    }

    // Handle NR title badge click
    function handleTitleBadgeClick(event) {
        event.preventDefault();
        event.stopPropagation();
        showTitleBubble(event.currentTarget);
    }

    // Show title explanation bubble
    function showTitleBubble(badge) {
        const badgeRect = badge.getBoundingClientRect();
        const bubbleWidth = 320;
        const bubbleHeight = 200; // approximate
        
        let left = badgeRect.right + 10;
        let top = badgeRect.top - 50;
        
        // Adjust if bubble would go off screen
        if (left + bubbleWidth > window.innerWidth) {
            left = badgeRect.left - bubbleWidth - 10;
            titleBubble.classList.add('arrow-right');
        } else {
            titleBubble.classList.remove('arrow-right');
        }
        
        if (top < 10) {
            top = 10;
        }
        
        if (top + bubbleHeight > window.innerHeight) {
            top = window.innerHeight - bubbleHeight - 10;
        }
        
        titleBubble.style.left = left + 'px';
        titleBubble.style.top = top + 'px';
        titleBubble.style.display = 'block';
        
        // Focus management
        closeTitleBubbleBtn.focus();
    }

    // Close title bubble
    function closeTitleBubble() {
        titleBubble.style.display = 'none';
    }

    // Handle clicks outside bubble
    function handleOutsideClick(event) {
        if (censorshipBubble.style.display === 'block' && 
            !censorshipBubble.contains(event.target) && 
            !event.target.classList.contains('sensitive-icon')) {
            closeBubble();
        }
        
        if (titleBubble.style.display === 'block' && 
            !titleBubble.contains(event.target) && 
            !event.target.classList.contains('nr-title-badge')) {
            closeTitleBubble();
        }
    }

    // Handle keyboard navigation
    function handleKeydown(event) {
        if (event.key === 'Escape') {
            if (censorshipBubble.style.display === 'block') {
                closeBubble();
            }
            if (titleBubble.style.display === 'block') {
                closeTitleBubble();
            }
        }
        
        // Toggle Safe Mode with Ctrl+Shift+S
        if (event.ctrlKey && event.shiftKey && event.key === 'S') {
            event.preventDefault();
            toggleSafeMode();
        }
    }

    // Basic Facebook post interactions (like, comment, etc.)
    function initBasicInteractions() {
        // Like button functionality
        const likeBtn = document.querySelector('.like-btn');
        let isLiked = false;

        if (likeBtn) {
            likeBtn.addEventListener('click', function() {
                if (!isLiked) {
                    likeBtn.style.color = '#1877f2';
                    likeBtn.innerHTML = '<i class="fas fa-thumbs-up"></i><span>Thích</span>';
                    isLiked = true;
                } else {
                    likeBtn.style.color = '#65676b';
                    likeBtn.innerHTML = '<i class="far fa-thumbs-up"></i><span>Thích</span>';
                    isLiked = false;
                }
            });
        }

        // Comment input focus
        const commentInput = document.querySelector('.comment-input');
        
        if (commentInput) {
            commentInput.addEventListener('focus', function() {
                this.style.backgroundColor = '#ffffff';
                this.style.border = '1px solid #1877f2';
            });

            commentInput.addEventListener('blur', function() {
                this.style.backgroundColor = '#f0f2f5';
                this.style.border = 'none';
            });

            commentInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter' && this.value.trim()) {
                    addComment(this.value.trim());
                    this.value = '';
                }
            });
        }

        // Comment like functionality
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('comment-action') && e.target.textContent === 'Thích') {
                e.target.style.color = '#1877f2';
                e.target.textContent = 'Đã thích';
            } else if (e.target.classList.contains('comment-action') && e.target.textContent === 'Đã thích') {
                e.target.style.color = '#65676b';
                e.target.textContent = 'Thích';
            }
        });

        // Share button
        const shareBtn = document.querySelector('.share-btn');
        if (shareBtn) {
            shareBtn.addEventListener('click', function() {
                alert('Chia sẻ bài viết thành công!');
            });
        }
    }

    // Add new comment function
    function addComment(text) {
        const commentsSection = document.querySelector('.comments-section');
        const writeComment = document.querySelector('.write-comment');
        
        if (!commentsSection || !writeComment) return;
        
        const newComment = document.createElement('div');
        newComment.className = 'comment';
        newComment.innerHTML = `
            <div class="comment-avatar user1">NM</div>
            <div class="comment-content">
                <div class="comment-bubble">
                    <strong>Nguyen Mien</strong>
                    <p>${text}</p>
                </div>
                <div class="comment-actions">
                    <span class="comment-time">Vừa xong</span>
                    <button class="comment-action">Thích</button>
                    <button class="comment-action">Trả lời</button>
                </div>
            </div>
        `;
        
        commentsSection.insertBefore(newComment, writeComment);
        
        // Update comment count
        const commentCountEl = document.querySelector('.comment-count');
        if (commentCountEl) {
            const currentCount = parseInt(commentCountEl.textContent.match(/\d+/)[0]);
            commentCountEl.textContent = `${currentCount + 1} bình luận`;
        }
    }

    // Add CSS for arrow positioning
    function addArrowStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .censorship-bubble.arrow-right::before {
                right: -8px;
                top: 20px;
                border-left: 1px solid #e4e6ea;
                border-top: 1px solid #e4e6ea;
                border-right: none;
                border-bottom: none;
            }
            
            .censorship-bubble:not(.arrow-right)::before {
                left: -8px;
                top: 20px;
                border-right: 1px solid #e4e6ea;
                border-bottom: 1px solid #e4e6ea;
                border-left: none;
                border-top: none;
            }
        `;
        document.head.appendChild(style);
    }

    // Initialize everything
    initSafeMode();
    initBasicInteractions();
    addArrowStyles();
    
    // Setup initial content
    setupCensoredContent();
    
    console.log('Safe Mode page loaded successfully');
});
