exports.root = (req, res) => {
  res.status(200).send("root");
};

exports.index = (req, res) => {
  res.render("index", {
    pageData: {
      pageTitle: "範例1：WebWorker",
      pageDescribt: 'WebWorker',
      hasJS: true,
      hasCSS: true,
      CssRoute: "layout",
      JsRoute: "main"
    }
  });
};
exports.turtleRabbit = (req, res) => {
  res.render("index", {
    pageData: {
      pageTitle: "範例2：Turtle & Rabbit",
      pageDescribt: 'animal race',
      hasJS: true,
      hasCSS: true,
      CssRoute: "layout",
      JsRoute: "turtleRabbit"
    }
  });
};