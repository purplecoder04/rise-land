create table if not exists public.journal_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  path_type text not null check (path_type in ('Rise', 'Land')),
  prompt_text text not null,
  journal_text text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists journal_entries_user_path_created_at_idx
  on public.journal_entries (user_id, path_type, created_at desc);

alter table public.journal_entries enable row level security;

create or replace function public.set_journal_entries_updated_at()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists journal_entries_set_updated_at on public.journal_entries;

create trigger journal_entries_set_updated_at
before update on public.journal_entries
for each row
execute function public.set_journal_entries_updated_at();

drop policy if exists "Users can read their own journal entries" on public.journal_entries;
create policy "Users can read their own journal entries"
on public.journal_entries
for select
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "Users can create their own journal entries" on public.journal_entries;
create policy "Users can create their own journal entries"
on public.journal_entries
for insert
to authenticated
with check ((select auth.uid()) = user_id);

drop policy if exists "Users can update their own journal entries" on public.journal_entries;
create policy "Users can update their own journal entries"
on public.journal_entries
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

drop policy if exists "Users can delete their own journal entries" on public.journal_entries;
create policy "Users can delete their own journal entries"
on public.journal_entries
for delete
to authenticated
using ((select auth.uid()) = user_id);
