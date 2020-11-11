const register = (app, db, models) => {
  console.log("[MySQL] models registered in database");
  app.use((req, res, next) => {
    res.locals.models = models;
    res.locals.db = db;
    next();
  });
  return app;
};

export default register;
