'use client';
import { AccountApi } from "@/app/api/account.api";
import { authState } from "@/states/auth";
import Link from "next/link";
import { useRecoilState } from "recoil";

export const HeaderNavigation = () => {
    const [auth] = useRecoilState(authState);

    const logout = async () => {
      await AccountApi.logout(auth.token);
      location.href = 'https://api.kyonggiti.me/google/logout';
    }

    return (
      <>
        {
          auth.isLoggedIn ?
          (
            <a className="font-bold text-sm" color="foreground" onClick={logout}>
                로그아웃
            </a>
          ) :
          (
            <Link className="font-bold text-sm" color="foreground" href="https://api.kyonggiti.me/google">
                로그인
            </Link>
          )
        }
      </>
    );
}