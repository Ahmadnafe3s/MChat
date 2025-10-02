declare interface User {
  id: number;
  name: string;
  email: string;
  mobile: string;
  company: string;
  attribute: string;
  role: string;
  self_id: number;
}

declare interface AuthStore {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
}

declare interface Chat {
  id: number;
  name: string;
  phone: string;
  formatted: string;
  status: string;
  unread_count: number;
  last_message: string;
  last_chat: string;
  is_starred: string;
}

declare interface PaginatedChats {
  data: Chat[];
  current_page: number;
  last_page: number;
  total: number;
}

declare interface ChatStore {
  selectedChat: Chat | null;
  setSelectedChat: (chat: Chat) => void;
  setStarred: (status: string) => void;
  setStatus: (status: string) => void;
}

declare interface Conversations {
  id: number;
  message_type: "user" | "customer" | "label";
  message_by: string;
  text?: string;
  header: {
    filetype: string;
    format: string;
    link: string;
  } | null;
  body: {
    text: string;
  };
  footer: string;
  button: [
    {
      text: string;
    },
  ];
  status: "sent" | "delivered" | "read" | "failed";
  datetime: string;
}

declare interface QuickReply {
  id: number;
  name: string;
  content: string;
}

declare interface ChatProfile {
  id: number;
  name: string;
  phone: string;
  submit_as: string;
  assign_to: string;
  flag: string;
  custom_field: CustomField[];
  attribute: Attribute[];
  tag: Tag[];
  note: Note[];
}

declare interface CustomField {
  field: string; // e.g., "dropdown" | "text" | "email"
  title: string; // display name (e.g., "product")
  name: string; // identifier (e.g., "product")
  input_value: string;
  value: string; // may contain JSON string or plain text
}

declare interface Attribute {
  id: number;
  name: string;
  text: string;
}

declare interface Tag {
  name: string;
  created_at: string; // ISO-like timestamp
}

declare interface Note {
  text: string;
  created_at: string; // ISO-like timestamp
}

declare interface AgentList {
  id: number
  name: string
}
