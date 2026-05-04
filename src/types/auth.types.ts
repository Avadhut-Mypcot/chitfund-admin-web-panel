export type User = {
    id: number;
    name: string;
    email?: string;
    phone?: string;
    status?: boolean;
    force_pwd_change_flag?: boolean;
    role_name: string;
    pwd_expiry_date?: string;
};

export interface AuthState {
    token: string | null;
    user: User | null;
    permission: string[] | null;
    error: string | null;
    loading: boolean;
}
