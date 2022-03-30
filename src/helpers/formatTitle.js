const formatTitle = (title, limit) => {
    if (title.length > limit) {
        return title.slice(0, limit) + "...";
    } else return title;
}

export default formatTitle;