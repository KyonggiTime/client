'use client';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuToggle } from "@nextui-org/navbar";
import Link from "next/link";
import { useEffect, useState } from "react";

export const HeaderNavigation = () => {
    const [prompt, setPrompt] = useState<unknown>();

    useEffect(() => {
      window.addEventListener('beforeinstallprompt', (event) => {
          event.preventDefault();
          console.log(event.prompt)
          if (event && event.prompt) {
            setPrompt(event);
          }
      });
    })

    const onClick = () => {
      console.log(prompt);
      if (prompt != null) {
        prompt.prompt();
      }
    }

    return (
      <>
        <Link className="font-bold text-sm mr-6" color="foreground" href="/">
            시간표
        </Link>
        <Link className="font-bold text-sm mr-6" color="foreground" href="/calculator">
            학점계산
        </Link>
        <Link className="font-bold text-sm mr-6" color="foreground" href="/notice">
            공지사항
        </Link>
        <Link className="font-bold text-sm mr-6" color="foreground" href="/help">
            버그 제보 및 문의
        </Link>
        <Link className="font-bold text-sm" color="foreground" href="" onClick={onClick}>
            앱 설치
        </Link>
      </>
    );
}