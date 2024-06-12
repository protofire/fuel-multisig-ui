import { useEffect, useRef } from "react";

import { IS_DEVELOPMENT } from "@/config/environment";
import { MultisigLocalManagmentEvents } from "@/domain/events/MultisigLocalManagmentEvents";
import { WalletConnectionEvents } from "@/domain/events/WalletConnectionEvents";

type EventCallback = () => void;
type EventNames =
  | keyof typeof WalletConnectionEvents
  | MultisigLocalManagmentEvents;

interface UseEventListenerCallbackOptions {
  delay?: number;
}

export function useEventListenerCallback(
  events: EventNames[] | EventNames, // accept any array of strings as event names
  callback: EventCallback,
  options?: UseEventListenerCallbackOptions
): void {
  const { delay } = options || {};
  const callbackRef = useRef<EventCallback>(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handleEvent = (event: Event) => {
      if (IS_DEVELOPMENT) {
        console.info("Received event::", event.type);
      }
      if (delay !== undefined) {
        const timeoutId = setTimeout(() => {
          callbackRef.current();
        }, delay);
        return () => clearTimeout(timeoutId);
      } else {
        callbackRef.current();
      }
    };

    const _events = Array.isArray(events) ? events : [events];

    _events.forEach((eventName) => {
      document.addEventListener(eventName, handleEvent);
    });

    return () => {
      _events.forEach((eventName) => {
        document.removeEventListener(eventName, handleEvent);
      });
    };
  }, [events, callback, delay]);
}
