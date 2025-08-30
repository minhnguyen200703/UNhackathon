// Facebook Post Interactions

document.addEventListener('DOMContentLoaded', function() {
    // Like button functionality
    const likeBtn = document.querySelector('.like-btn');
    const reactionCount = document.querySelector('.reaction-count');
    let isLiked = false;
    let likeCount = 4; // Initial count (you + 3 others)

    likeBtn.addEventListener('click', function() {
        if (!isLiked) {
            // Like the post
            likeBtn.style.color = '#1877f2';
            likeBtn.innerHTML = '<i class="fas fa-thumbs-up"></i><span>Thích</span>';
            isLiked = true;
        } else {
            // Unlike the post
            likeBtn.style.color = '#65676b';
            likeBtn.innerHTML = '<i class="far fa-thumbs-up"></i><span>Thích</span>';
            isLiked = false;
        }
    });

    // Comment input focus
    const commentInput = document.querySelector('.comment-input');
    
    commentInput.addEventListener('focus', function() {
        this.style.backgroundColor = '#ffffff';
        this.style.border = '1px solid #1877f2';
    });

    commentInput.addEventListener('blur', function() {
        this.style.backgroundColor = '#f0f2f5';
        this.style.border = 'none';
    });

    // Comment submission
    commentInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && this.value.trim()) {
            addComment(this.value.trim());
            this.value = '';
        }
    });

    // Add new comment function
    function addComment(text) {
        const commentsSection = document.querySelector('.comments-section');
        const writeComment = document.querySelector('.write-comment');
        
        const newComment = document.createElement('div');
        newComment.className = 'comment';
        newComment.innerHTML = `
            <div class="comment-avatar user1">NM</div>
            <div class="comment-content">
                <div class="comment-bubble">
                    <strong>Nguyễn Minh</strong>
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
        const currentCount = parseInt(commentCountEl.textContent.match(/\d+/)[0]);
        commentCountEl.textContent = `${currentCount + 1} bình luận`;
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
    shareBtn.addEventListener('click', function() {
        // Simple share simulation
        alert('Chia sẻ bài viết thành công!');
    });

    // News card is now a proper link - no JavaScript needed

    // Emoji reactions simulation
    const reactionIcons = document.querySelector('.reaction-icons');
    reactionIcons.addEventListener('click', function() {
        // Show reaction picker (simplified)
        const reactions = ['👍', '❤️', '😆', '😮', '😢', '😡'];
        const randomReaction = reactions[Math.floor(Math.random() * reactions.length)];
        alert(`Bạn đã react ${randomReaction}`);
    });

    // ===== NEUTRAL READER FUNCTIONALITY =====
    
    // Neutral Reader elements
    const nrTrigger = document.getElementById('nr-trigger');
    const nrBadge = document.getElementById('nr-badge');
    const nrPopover = document.getElementById('nr-popover');
    const nrShareBtn = document.getElementById('share-btn');
    const closeBtn = document.getElementById('close-btn');
    const shareModal = document.getElementById('share-modal');
    const modalClose = document.getElementById('modal-close');
    const modalCancel = document.getElementById('modal-cancel');
    const modalPost = document.getElementById('modal-post');
    const toast = document.getElementById('toast');

    let isNeutralReaderActive = false;

    function activateNeutralReader() {
        document.body.classList.add('nr-active');
        nrTrigger.classList.add('activated');
        isNeutralReaderActive = true;
        console.log('Neutral Reader activated - potentially problematic content detected');
    }

    function deactivateNeutralReader() {
        document.body.classList.remove('nr-active', 'nr-popover-open', 'nr-modal-open');
        nrTrigger.classList.remove('activated');
        isNeutralReaderActive = false;
        console.log('Neutral Reader deactivated');
    }

    function toggleNeutralReader() {
        if (isNeutralReaderActive) {
            deactivateNeutralReader();
        } else {
            activateNeutralReader();
        }
    }

    function showPopover() {
        document.body.classList.add('nr-popover-open');
    }

    function hidePopover() {
        document.body.classList.remove('nr-popover-open');
    }

    function showModal() {
        document.body.classList.remove('nr-popover-open'); // Ensure popover is hidden
        document.body.classList.add('nr-modal-open');
        // Focus on the textarea
        const textarea = document.getElementById('composer-text');
        if (textarea) {
            setTimeout(() => textarea.focus(), 100);
        }
    }

    function hideModal() {
        document.body.classList.remove('nr-modal-open');
    }

    // Trigger button click event
    if (nrTrigger) {
        nrTrigger.addEventListener('click', toggleNeutralReader);
        nrTrigger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleNeutralReader();
            }
        });
    }

    // Badge click event
    if (nrBadge) {
        nrBadge.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            showPopover();
        });
        nrBadge.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                e.stopPropagation();
                showPopover();
            }
        });
    }

    // Popover buttons
    if (nrShareBtn) {
        nrShareBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            showModal(); // This will hide popover and show modal
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            hidePopover();
        });
    }

    // Prevent popover clicks from bubbling to the news link
    if (nrPopover) {
        nrPopover.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    // Modal buttons
    if (modalClose) {
        modalClose.addEventListener('click', () => {
            hideModal();
            showPopover();
        });
    }

    if (modalCancel) {
        modalCancel.addEventListener('click', () => {
            hideModal();
            showPopover();
        });
    }

    if (modalPost) {
        modalPost.addEventListener('click', () => {
            // Show success toast
            if (toast) {
                toast.style.display = 'block';
                setTimeout(() => {
                    toast.style.display = 'none';
                    hideModal();
                    hidePopover();
                }, 2000);
            }
        });
    }

    // Modal overlay click to close
    if (shareModal) {
        shareModal.addEventListener('click', (e) => {
            if (e.target === shareModal) {
                hideModal();
                showPopover();
            }
        });

        // Focus trapping for modal
        shareModal.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                hideModal();
                showPopover();
            }
            
            if (e.key === 'Tab') {
                const focusableElements = shareModal.querySelectorAll(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];

                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        });
    }

    console.log('Neutral Reader functionality loaded');
});
