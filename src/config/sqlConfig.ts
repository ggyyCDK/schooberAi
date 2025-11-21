const DEV_SQL_CONFIG = {
  host: "localhost",
  username: "root",
  password: "wzy13579",
};
const PRO_SQL_CONFIG = {
  host: "rm-bp1854x0z3445ng13zo.mysql.rds.aliyuncs.com",
  username: "dms_user_47051c5",
  password: "woshiGY3011",
};

export default (() => {
  if (process.env?.NODE_ENV === "local") return DEV_SQL_CONFIG;
  else return PRO_SQL_CONFIG;
})();
