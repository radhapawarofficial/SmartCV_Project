/* ==========================================================================
   SmartCV — dashboard.js
========================================================================== */
document.addEventListener('DOMContentLoaded', function () {
    /* ── Sidebar mobile toggle ── */
    const sidebar      = document.getElementById('sidebar');
    const mobileToggle = document.getElementById('mobileToggle');

    if (mobileToggle && sidebar) {
        mobileToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            sidebar.classList.toggle('open');
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.toggle('bi-list');
                icon.classList.toggle('bi-x-lg');
            }
        });

        document.addEventListener('click', function (e) {
            if (
                sidebar.classList.contains('open') &&
                !sidebar.contains(e.target) &&
                !mobileToggle.contains(e.target)
            ) {
                sidebar.classList.remove('open');
                const icon = mobileToggle.querySelector('i');
                if (icon) { icon.classList.replace('bi-x-lg', 'bi-list'); }
            }
        });
    }

    /* ── User profile modal ── */
    const userProfileBtn = document.getElementById('userProfileBtn');
    if (userProfileBtn) {
        userProfileBtn.addEventListener('click', function (e) {
            e.preventDefault();
            new bootstrap.Modal(document.getElementById('userProfileModal')).show();
        });
    }

    /* ── DELETE: unchanged — already works ── */
    document.querySelectorAll('.delete-cv-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            const cvId    = this.dataset.cvId;
            const cvTitle = this.dataset.cvTitle;
            document.getElementById('deleteResumeTitle').textContent = cvTitle;
            document.getElementById('deleteConfirmForm').action = `/cv/${cvId}/delete/`;
            new bootstrap.Modal(document.getElementById('deleteConfirmModal')).show();
        });
    });

});