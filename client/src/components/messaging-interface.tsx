import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Send, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

// Mock current user ID and selected conversation
const CURRENT_USER_ID = "mock-user-id";

interface Conversation {
  match: {
    id: string;
    userId1: string;
    userId2: string;
    status: string;
  };
  lastMessage: {
    id: string;
    content: string;
    timestamp: Date;
    senderId: string;
  };
  otherUser: {
    id: string;
    name: string;
    profilePhoto: string;
    isOnline: boolean;
  };
}

interface Message {
  id: string;
  matchId: string;
  senderId: string;
  content: string;
  timestamp: Date;
}

export default function MessagingInterface() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedConversationId, setSelectedConversationId] = useState<string>("");
  const [messageInput, setMessageInput] = useState("");

  // Mock conversations data since we don't have real matches set up
  const mockConversations: Conversation[] = [
    {
      match: { id: "match1", userId1: CURRENT_USER_ID, userId2: "user1", status: "accepted" },
      lastMessage: {
        id: "msg1",
        content: "Great workout today! Same time tomorrow?",
        timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
        senderId: "user1"
      },
      otherUser: {
        id: "user1",
        name: "Alex Johnson",
        profilePhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        isOnline: true
      }
    },
    {
      match: { id: "match2", userId1: CURRENT_USER_ID, userId2: "user2", status: "accepted" },
      lastMessage: {
        id: "msg2",
        content: "The yoga class was amazing! Thanks for the recommendation.",
        timestamp: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
        senderId: "user2"
      },
      otherUser: {
        id: "user2",
        name: "Sarah Chen",
        profilePhoto: "https://images.unsplash.com/photo-1494790108755-2616b612b8a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        isOnline: false
      }
    },
    {
      match: { id: "match3", userId1: CURRENT_USER_ID, userId2: "user3", status: "accepted" },
      lastMessage: {
        id: "msg3",
        content: "Ready for that 6am run? 🏃‍♂️",
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
        senderId: "user3"
      },
      otherUser: {
        id: "user3",
        name: "Mike Rodriguez",
        profilePhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        isOnline: true
      }
    }
  ];

  // Mock messages for selected conversation
  const mockMessages: Message[] = [
    {
      id: "1",
      matchId: selectedConversationId || "match1",
      senderId: selectedConversationId ? mockConversations.find(c => c.match.id === selectedConversationId)?.otherUser.id || "user1" : "user1",
      content: "Hey! Are you free for a workout session tomorrow morning?",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000)
    },
    {
      id: "2",
      matchId: selectedConversationId || "match1",
      senderId: CURRENT_USER_ID,
      content: "Absolutely! I was thinking we could try that new HIIT class. What do you think?",
      timestamp: new Date(Date.now() - 3.8 * 60 * 60 * 1000)
    },
    {
      id: "3",
      matchId: selectedConversationId || "match1",
      senderId: selectedConversationId ? mockConversations.find(c => c.match.id === selectedConversationId)?.otherUser.id || "user1" : "user1",
      content: "Perfect! I've been wanting to try that class. Let's meet at the gym at 7:30?",
      timestamp: new Date(Date.now() - 3.5 * 60 * 60 * 1000)
    }
  ];

  const selectedConversation = selectedConversationId 
    ? mockConversations.find(c => c.match.id === selectedConversationId)
    : mockConversations[0];

  const sendMessageMutation = useMutation({
    mutationFn: async (content: string) => {
      // In real app, this would send to the API
      return apiRequest("POST", "/api/messages", {
        matchId: selectedConversation?.match.id,
        senderId: CURRENT_USER_ID,
        content,
      });
    },
    onSuccess: () => {
      setMessageInput("");
      toast({
        title: "Message sent! 📱",
      });
      // Would invalidate and refetch messages
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
    },
  });

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      sendMessageMutation.mutate(messageInput.trim());
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (minutes < 1) return "now";
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    return date.toLocaleDateString();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Conversation List */}
      <div className="lg:col-span-1">
        <Card className="border-gray-100 overflow-hidden shadow-sm">
          <div className="p-4 border-b border-gray-100">
            <div className="relative">
              <Input
                placeholder="Search conversations..."
                className="pl-10 focus:ring-2 focus:ring-orange/20 focus:border-orange"
              />
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            </div>
          </div>
          
          <div className="divide-y divide-gray-100">
            {mockConversations.map((conversation) => (
              <div
                key={conversation.match.id}
                className={`p-4 cursor-pointer transition-colors ${
                  selectedConversationId === conversation.match.id || (!selectedConversationId && conversation === mockConversations[0])
                    ? 'bg-orange/5 border-r-4 border-orange'
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => setSelectedConversationId(conversation.match.id)}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={conversation.otherUser.profilePhoto}
                      alt={conversation.otherUser.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {conversation.otherUser.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-energetic-green rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-charcoal truncate">
                      {conversation.otherUser.name}
                    </p>
                    <p className="text-sm text-gray-600 truncate">
                      {conversation.lastMessage.content}
                    </p>
                  </div>
                  <div className="text-xs text-gray-500">
                    {formatTime(conversation.lastMessage.timestamp)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
      
      {/* Active Chat */}
      <div className="lg:col-span-2">
        <Card className="border-gray-100 overflow-hidden shadow-sm h-96">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-100 bg-gray-50">
            <div className="flex items-center space-x-3">
              <img
                src={selectedConversation?.otherUser.profilePhoto}
                alt={selectedConversation?.otherUser.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-charcoal">
                  {selectedConversation?.otherUser.name}
                </p>
                <Badge
                  variant="secondary"
                  className={`text-xs ${
                    selectedConversation?.otherUser.isOnline
                      ? 'bg-energetic-green/10 text-energetic-green'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {selectedConversation?.otherUser.isOnline ? 'Online now' : 'Offline'}
                </Badge>
              </div>
            </div>
          </div>
          
          {/* Chat Messages */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto" style={{ height: "240px" }}>
            {mockMessages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-2 ${
                  message.senderId === CURRENT_USER_ID ? 'justify-end' : ''
                }`}
              >
                {message.senderId !== CURRENT_USER_ID && (
                  <img
                    src={selectedConversation?.otherUser.profilePhoto}
                    alt={selectedConversation?.otherUser.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                )}
                <div
                  className={`rounded-2xl px-4 py-2 max-w-xs ${
                    message.senderId === CURRENT_USER_ID
                      ? 'bg-gradient-to-r from-orange to-red-500 text-white'
                      : 'bg-gray-100 text-charcoal'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.senderId === CURRENT_USER_ID ? 'text-orange-100' : 'text-gray-500'
                  }`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Message Input */}
          <div className="p-4 border-t border-gray-100">
            <div className="flex space-x-2">
              <Input
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 rounded-full focus:ring-2 focus:ring-orange/20 focus:border-orange"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!messageInput.trim() || sendMessageMutation.isPending}
                className="bg-gradient-to-r from-orange to-red-500 hover:shadow-lg transition-all p-2 rounded-full"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
