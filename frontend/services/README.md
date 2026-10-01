# Frontend Service Boundary

Screens should depend on service interfaces, not on demo arrays or Supabase calls directly.

Example shape:

~~~ts
export interface EventService {
  list(filters?: EventFilters): Promise<EventSummary[]>;
  get(eventId: string): Promise<EventDetail>;
  save(eventId: string): Promise<void>;
}

export interface LiveService {
  state(eventId: string): Promise<LiveState>;
  join(eventId: string, code: string): Promise<LiveState>;
  issueQr(eventId: string): Promise<LiveQr>;
  scan(eventId: string, token: string): Promise<ConnectionPreview>;
}
~~~

Provide two implementations:

~~~text
DemoEventService
ApiEventService

DemoLiveService
ApiLiveService
~~~

Lovable should build screens against the interface. The app can start in demo mode, and switching to a real backend should mostly mean changing which service implementation is injected.
