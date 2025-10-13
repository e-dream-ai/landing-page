import { useCallback } from "react";

export function useMergedRefs<T>(
	...refs: Array<React.Ref<T> | undefined>
): (node: T | null) => void {
	return useCallback(
		(node: T | null) => {
			for (const ref of refs) {
				if (!ref) continue;

				if (typeof ref === "function") {
					ref(node);
				} else {
					(ref as React.RefObject<T | null>).current = node;
				}
			}
		},
		[...refs, refs],
	);
}
