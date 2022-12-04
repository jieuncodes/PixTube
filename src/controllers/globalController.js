export const home = (req, res) => {
    // return res.render("pages/home", {pageTitle: "Home"});
    return res.redirect("/videos");
};
