declare interface WhatsAppInfo {
  email: string;
  number: string;
  status: string;
  vertical: string;
  name_status: string | null;
  verified_name: string;
  quality_rating: string;
  messaging_limit: string;
  about: string;
  description: string;
  address: string;
  plan: string;
}

declare interface VoiceInfo {
  name: string;
  number: string;
  mirror_number: string;
  destination: string;
  destination_name: string;
  plan: string;
  fcm: string;
}

declare interface User {
  id: number;
  name: string;
  mobile: string;
  email: string;
  company: string;
  role: string;
  attribute: string;
  self_id: string;
  company_logo: string;
  flag: string;
  whatsapp: WhatsAppInfo;
  voice: VoiceInfo;
  wallet: string;
}

declare interface AuthStore {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
  isHydrated: boolean;
  setHydrated: (status: boolean) => void;
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
  is_starred: string;
}

declare interface ChatStore {
  selectedChat: Chat | Contact | null;
  setSelectedChat: (chat: Chat | Contact) => void;
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


// --------------------Chat Profile-------------------


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
  id: number;
  name: string;
  created_at: string; // ISO-like timestamp
}

declare interface Note {
  id: number;
  text: string;
  created_at: string; // ISO-like timestamp
}

declare interface AgentList {
  id: number
  name: string
}


// --------------------Templates-------------------

declare interface TemplatesResponse {
  success: boolean;
  count: number;
  data: Template[]
}

declare interface Template {
  id: number;
  name: string;
  category: "MARKETING" | "UTILITY" | string;
  language: string;
  type: string;
  header: {
    type: string;
    content: string;
  }
  body: string;
  footer: string;
  button: string[];
  variable: string;
  created_at: string;
}


// --------------------Chat Media-------------------


declare interface ChatMediaResponse {
  success: true,
  data: Array<{
    id: number,
    filetype: "audio" | "image" | "video",
    format: "ogg" | "mp4" | "png",
    link: string
  }>,
  count: 0
}



// --------------------Calls-------------------

declare interface CallLogs {
  success: true,
  statuses: {
    total: number
    missed: string,
    answered: string
    incoming: string
    outgoing: string
  },
  current_page: number,
  last_page: number,
  count: number
  data: Array<{
    id: number
    agent_name: string
    contact_name: string
    contact_phone: string
    call_status: string
    duration: string
    direction: string
    call_date: string
  }>

}



// --------------------Campaigns-------------------


declare interface Campaign {
  id: number;
  job_id: string;
  template: string;
  phonebook: string;
  total: number;
  status: string;
  through: string;
  scheduled_at: string;
  deducted: string;
  formatted_date: string;
  created_at: string;
}

declare interface CampaignStatuses {
  total: number;
  pending_count: string;
  submitted_count: string;
  sent_count: string;
  delivered_count: string;
  read_count: string;
  failed_count: string;
  paused_count: string;
}

declare interface CampaignResponse {
  success: boolean;
  statuses: CampaignStatuses;
  count: number;
  data: Campaign[];
  current_page: number;
  last_page: number;
}


declare interface CampaignDetails {
  id: number,
  total: string
  pending_count: number
  submitted_count: number
  sent_count: number
  delivered_count: number
  read_count: number
  failed_count: number
  paused_count: number
}




// --------------------Contacts-------------------


declare interface Contact {
  id: number,
  name: string
  phone: string
  formatted: string
  status: string
  source: string
  is_starred: string
}


declare interface paginatedContacts {
  data: Contact[],
  current_page: number,
  last_page: number,
  total: number
}


// --------------------Send Template-------------------

declare interface SendTemplate {
  templateId: number,
  data: any
}


// --------------------Bot-------------------

declare interface BotMessage {
  id: number,
  name: string,
  keyword: string,
  created_at: string
}

declare interface BotMessageResponse {
  success: true,
  count: number,
  data: BotMessage[]
}