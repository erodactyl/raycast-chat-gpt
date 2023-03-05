import { Action, ActionPanel, Color, Icon, List } from "@raycast/api";
import { useEffect, useState } from "react";
import { useConversation } from "./utils/useConversation";

export default function Command() {
  const { messages, sendMessage, loading } = useConversation();
  const [question, setQuestion] = useState("");
  const [selectedItemId, setSelectedItemId] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (messages.length > 0) {
      setSelectedItemId(messages[messages.length - 1].id);
    }
  }, [messages.length]);

  const handleQuestion = () => {
    sendMessage(question);
    setQuestion("");
  };

  return (
    <>
      <List
        filtering={false}
        selectedItemId={selectedItemId}
        searchText={question}
        onSearchTextChange={setQuestion}
        isLoading={loading}
        searchBarPlaceholder="Ask your question..."
        isShowingDetail
        actions={
          <ActionPanel>
            <Action.SubmitForm title="Ask" onSubmit={handleQuestion} icon={Icon.Envelope} />
          </ActionPanel>
        }
      >
        {messages.map((m) => (
          <List.Item
            key={m.id}
            id={m.id}
            title={m.role === "user" ? "You" : "Fragen"}
            icon={
              m.role === "user"
                ? { source: Icon.QuestionMark, tintColor: Color.Orange }
                : { source: Icon.Message, tintColor: Color.Green }
            }
            subtitle={m.content.trim()}
            actions={
              <ActionPanel>
                <Action.SubmitForm title="Ask" onSubmit={handleQuestion} icon={Icon.Envelope} />
              </ActionPanel>
            }
            detail={<List.Item.Detail markdown={m.content} />}
          />
        ))}
      </List>
    </>
  );
}
