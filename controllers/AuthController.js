import AuthUser from "../models/AuthUserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export async function register(req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password required" });
    }
    try {
        const existing = await AuthUser.findOne({ where: { username } });
        if (existing) {
            return res.status(409).json({ message: "Username already exists" });
        }
        const hashed = await bcrypt.hash(password, 10);
        const user = await AuthUser.create({ username, password: hashed });
        const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: "1d" });
        res.status(201).json({ token });
    } catch (err) {
        console.error("Registration error:", err); // Add detailed error logging
        res.status(500).json({ message: "Registration failed", error: err.message });
    }
}

export async function login(req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password required" });
    }
    try {
        const user = await AuthUser.findOne({ where: { username } });
        if (!user) return res.status(401).json({ message: "Invalid credentials" });
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(401).json({ message: "Invalid credentials" });
        const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: "1d" });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: "Login failed" });
    }
}

export function logout(req, res) {
    // For JWT, logout is handled client-side by deleting the token
    res.json({ message: "Logged out" });
}

export function authMiddleware(req, res, next) {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(401).json({ message: "No token provided" });
    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
}
