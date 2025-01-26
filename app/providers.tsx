"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { RecoilRoot } from "recoil";

export interface ProvidersProps {
	children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
	return (
		<RecoilRoot>
			<NextUIProvider>
				{children}
			</NextUIProvider>
		</RecoilRoot>
		);
}
