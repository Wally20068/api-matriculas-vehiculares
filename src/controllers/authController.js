import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { readFileSync, writeFileSync } from "fs";

const file = "data/users.json";
const SECRET = "vehiculos123jwt";

function loadUsers() {
  try {
    return JSON.parse(readFileSync(file, "utf8")).usuarios || [];
  } catch {
    return [];
  }
}

function saveUsers(users) {
  writeFileSync(file, JSON.stringify({ usuarios: users }, null, 2));
}

export const register = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: "username y password requeridos" });

  const users = loadUsers();
  if (users.find(u => u.username === username))
    return res.status(400).json({ error: "usuario ya existe" });

  const hashed = bcrypt.hashSync(password, 8);
  users.push({ id: users.length + 1, username, password: hashed });
  saveUsers(users);
  res.json({ ok: true, message: "Usuario creado correctamente" });
};

export const login = (req, res) => {
  const { username, password } = req.body;
  const users = loadUsers();
  const user = users.find(u => u.username === username);
  if (!user) return res.status(401).json({ error: "Credenciales inválidas" });

  const valid = bcrypt.compareSync(password, user.password);
  if (!valid) return res.status(401).json({ error: "Contraseña incorrecta" });

  const token = jwt.sign({ id: user.id, username }, SECRET, { expiresIn: "2h" });
  res.json({ ok: true, token });
};
