


if (sesUserId == 0) {
    window.location.href = '/';
}
$('#btnlogout').click(function () {
    window.localStorage.clear();
    window.location.href = '/';
});