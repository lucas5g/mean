"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// server/index.ts
var server_exports = {};
__export(server_exports, {
  app: () => app,
  default: () => server_default,
  prisma: () => prisma
});
module.exports = __toCommonJS(server_exports);
var import_fastify = __toESM(require("fastify"), 1);
var import_client = require("@prisma/client");
var import_zod = require("zod");
var import_cors = __toESM(require("@fastify/cors"), 1);
var app = (0, import_fastify.default)();
app.register(import_cors.default);
var prisma = new import_client.PrismaClient();
app.get("/api", async () => {
  return await prisma.word.findMany({
    orderBy: [
      {
        fixed: "desc"
      },
      {
        name: "asc"
      }
    ]
  });
});
app.get("/api/:id", async (req) => {
  const { id } = import_zod.z.object({
    id: import_zod.z.coerce.number()
  }).parse(req.params);
  return await prisma.word.findFirst({
    where: { id }
  });
});
app.patch("/api/:id", async (req) => {
  const { id } = import_zod.z.object({
    id: import_zod.z.coerce.number()
  }).parse(req.params);
  const data = import_zod.z.object({
    name: import_zod.z.string(),
    meaning: import_zod.z.string(),
    fixed: import_zod.z.boolean()
  }).partial().parse(req.body);
  return await prisma.word.update({
    where: { id },
    data
  });
});
app.post("/api", async (req) => {
  const data = import_zod.z.object({
    name: import_zod.z.string(),
    meaning: import_zod.z.string(),
    fixed: import_zod.z.boolean()
  }).parse(req.body);
  return await prisma.word.create({
    data
  });
});
app.delete("/api/:id", async (req, res) => {
  const { id } = import_zod.z.object({
    id: import_zod.z.coerce.number()
  }).parse(req.params);
  res.status(204).send(
    await prisma.word.delete({
      where: { id }
    })
  );
});
app.setErrorHandler((error, req, res) => {
  console.log(error);
  res.status(500).send({ msg: "algum erro" });
});
app.listen({
  port: 8e3
}).then(() => console.log("http://localhost:8000/api"));
var server_default = async (req, res) => {
  await app.ready();
  app.server.emit("request", req, res);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  app,
  prisma
});
