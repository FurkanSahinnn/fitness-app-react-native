import { createUserService, getAllUsersService, getUserByIdService, updateUserService, deleteUserService } from "../services/userService.js";

const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({
        message,
        data
    });
}

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await getAllUsersService();
        if (!users) {
            handleResponse(res, 404, "Users not found");
            return;
        }
        handleResponse(res, 200, "Users fetched successfully", users);
    } catch (error) {
        next(error);
    }
}

export const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await getUserByIdService(id);
        if (!user) {
            handleResponse(res, 404, "User not found");
            return;
        }
        handleResponse(res, 200, "User fetched successfully", user);
    } catch (error) {
        next(error);
    }
}

export const createUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const user = await createUserService(name, email, password);
        if (!user) {
            handleResponse(res, 400, "User creation failed");
            return;
        }
        handleResponse(res, 201, "User created successfully", user);
    } catch (error) {
        next(error);
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;
        const user = await updateUserService(id, name, email);
        if (!user) {
            handleResponse(res, 404, "User not found");
            return;
        }
        handleResponse(res, 200, "User updated successfully", user);
    } catch (error) {
        next(error);
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await deleteUserService(id);
        if (!user) {
            handleResponse(res, 404, "User not found");
            return;
        }
        handleResponse(res, 200, "User deleted successfully", user);
    } catch (error) {
        next(error);
    }
}


