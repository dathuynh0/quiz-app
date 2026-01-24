import api from "../lib/axios";

export const authService = {
  signUp: async (username, password, displayName) => {
    const res = await api.post(
      "/auth/signup",
      {
        username,
        password,
        displayName,
      },
      { withCredentials: true },
    );

    return res.data;
  },

  signIn: async (username, password) => {
    const res = await api.post(
      "/auth/signin",
      {
        username,
        password,
      },
      { withCredentials: true },
    );

    return res.data;
  },

  signOut: async () => {
    await api.post("/auth/signout", { withCredentials: true });
  },

  fetchUser: async () => {
    const res = await api.get("/users/me", { withCredentials: true });

    return res.data;
  },

  refresh: async () => {
    const res = await api.post("/auth/refresh", { withCredentials: true });

    return res.data.accessToken;
  },
};
