
-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create table
create table qr_codes (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  title text not null,
  url text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table qr_codes enable row level security;

-- Create policies
create policy "Users can view their own QR codes" on qr_codes
  for select using (auth.uid() = user_id);

create policy "Users can insert their own QR codes" on qr_codes
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own QR codes" on qr_codes
  for update using (auth.uid() = user_id);

create policy "Users can delete their own QR codes" on qr_codes
  for delete using (auth.uid() = user_id);
