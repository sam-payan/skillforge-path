import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, User, BookOpen, Lightbulb, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "mentor";
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

const initialMessages: Message[] = [
  {
    id: "1",
    role: "mentor",
    content:
      "Hello Alex! I'm your AI learning coach. I see you're working on React Hooks — how can I help you today?",
    timestamp: new Date(),
    suggestions: [
      "Explain useEffect dependencies",
      "When should I use useCallback?",
      "Help me debug my component",
    ],
  },
];

const quickActions = [
  { icon: BookOpen, label: "Explain concept", prompt: "Can you explain " },
  { icon: Lightbulb, label: "Give me a hint", prompt: "I need a hint for " },
  { icon: Target, label: "Review my approach", prompt: "Can you review my approach to " },
];

const MentorChat = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const mentorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "mentor",
        content:
          "Great question! The useEffect hook is one of the most important concepts in React. It lets you perform side effects in function components. The dependency array controls when the effect runs — if a value in the array changes, the effect re-runs. An empty array means it only runs once on mount.\n\nWould you like me to show you some common patterns?",
        timestamp: new Date(),
        suggestions: ["Show me patterns", "What about cleanup?", "Compare with useLayoutEffect"],
      };
      setMessages((prev) => [...prev, mentorMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* Chat Header */}
      <div className="flex items-center gap-3 p-4 border-b border-border">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">AI Learning Coach</h3>
          <p className="text-xs text-muted-foreground">
            Context: React Hooks Deep Dive
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-2 p-4 border-b border-border">
        {quickActions.map((action) => (
          <Button
            key={action.label}
            variant="secondary"
            size="sm"
            className="gap-1.5 text-xs"
            onClick={() => setInput(action.prompt)}
          >
            <action.icon className="w-3 h-3" />
            {action.label}
          </Button>
        ))}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
        {messages.map((message, index) => (
          <div
            key={message.id}
            className={cn(
              "flex gap-3 animate-fade-in",
              message.role === "user" && "flex-row-reverse"
            )}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div
              className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                message.role === "mentor"
                  ? "bg-gradient-to-br from-primary to-accent"
                  : "bg-secondary"
              )}
            >
              {message.role === "mentor" ? (
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              ) : (
                <User className="w-4 h-4 text-muted-foreground" />
              )}
            </div>
            <div className={cn("max-w-[80%]", message.role === "user" && "text-right")}>
              <div
                className={cn(
                  message.role === "mentor" ? "mentor-bubble" : "user-bubble"
                )}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
              {message.suggestions && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {message.suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-3 py-1.5 rounded-full text-xs font-medium bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3 animate-fade-in">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <div className="mentor-bubble">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" />
                <span
                  className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                />
                <span
                  className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask your AI coach anything..."
            className="flex-1 px-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
          />
          <Button
            variant="hero"
            size="icon"
            onClick={handleSend}
            disabled={!input.trim()}
            className="h-12 w-12"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Your coach adapts to your learning style and current progress
        </p>
      </div>
    </div>
  );
};

export default MentorChat;
