const formatTopicsDate = function (date) {
    let last = new Date(date).getTime();
    let current = new Date().getTime();
    let temp = ~~((current - last) / 1000);
    if (~~(temp / 60) === 0) {
        return `${~~temp}秒前`;
    } else if (~~(temp / (60 * 60)) === 0) {
        return `${~~(temp / 60)}分钟前`;
    } else if (~~(temp / (60 * 60 * 24)) === 0) {
        return `${~~(temp / (60 * 60))}小时前`;
    } else if (~~(temp / (60 * 60 * 24 * 30)) === 0) {
        return `${~~(temp / (60 * 60 * 24))}天前`;
    } else if (~~(temp / (60 * 60 * 24 * 30 * 12)) === 0) {
        return `${~~(temp / (60 * 60 * 24 * 30))}月前`;
    } else {
        return `${~~(temp / (60 * 60 * 24 * 30 * 12))}年前`;
    }
}

module.exports = {
    formatTopicsDate
}
