import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface Message {
  id: number;
  username: string;
  text: string;
  timestamp: string;
  isOwn?: boolean;
}

interface RoomData {
  id: number;
  team1: string;
  team2: string;
  team1Logo: string;
  team2Logo: string;
  onlineCount: number;
  votes: {
    p1: number;
    x: number;
    p2: number;
  };
}

const mockRoomsData: RoomData[] = [
  { id: 1, team1: 'Манчестер Сити', team2: 'Арсенал', team1Logo: 'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg', team2Logo: 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg', onlineCount: 247, votes: { p1: 124, x: 45, p2: 78 } },
  { id: 2, team1: 'Реал Мадрид', team2: 'Барселона', team1Logo: 'https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg', team2Logo: 'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg', onlineCount: 532, votes: { p1: 234, x: 98, p2: 200 } },
  { id: 3, team1: 'Бавария', team2: 'Боруссия', team1Logo: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg', team2Logo: 'https://upload.wikimedia.org/wikipedia/commons/6/67/Borussia_Dortmund_logo.svg', onlineCount: 189, votes: { p1: 95, x: 32, p2: 62 } },
  { id: 4, team1: 'ПСЖ', team2: 'Марсель', team1Logo: 'https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg', team2Logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d8/Olympique_Marseille_logo.svg', onlineCount: 312, votes: { p1: 156, x: 67, p2: 89 } },
  { id: 5, team1: 'Ливерпуль', team2: 'Челси', team1Logo: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg', team2Logo: 'https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg', onlineCount: 428, votes: { p1: 198, x: 89, p2: 141 } },
  { id: 6, team1: 'Милан', team2: 'Интер', team1Logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/Logo_of_AC_Milan.svg', team2Logo: 'https://upload.wikimedia.org/wikipedia/commons/0/05/FC_Internazionale_Milano_2021.svg', onlineCount: 276, votes: { p1: 132, x: 54, p2: 90 } },
];

const mockMessages: Message[] = [
  { id: 1, username: 'Алексей', text: 'Сегодня Манчестер точно возьмёт!', timestamp: '14:23' },
  { id: 2, username: 'Дмитрий', text: 'Не факт, Арсенал в отличной форме', timestamp: '14:24' },
  { id: 3, username: 'Михаил', text: 'Ставлю на ничью 2-2', timestamp: '14:25' },
  { id: 4, username: 'Сергей', text: 'Холанд забьёт первым, смотрите', timestamp: '14:26' },
  { id: 5, username: 'Владимир', text: 'У Арсенала защита слабовата сегодня', timestamp: '14:27' },
];

export default function Room() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [userVote, setUserVote] = useState<'p1' | 'x' | 'p2' | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const roomId = parseInt(id || '1');
  const room = mockRoomsData.find(r => r.id === roomId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!room) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex items-center justify-center">
        <Card className="p-8 text-center">
          <Icon name="AlertCircle" size={48} className="mx-auto mb-4 text-destructive" />
          <h2 className="text-2xl font-bold mb-2">Комната не найдена</h2>
          <Button onClick={() => navigate('/')} className="mt-4">
            Вернуться к списку
          </Button>
        </Card>
      </div>
    );
  }

  const totalVotes = room.votes.p1 + room.votes.x + room.votes.p2;
  const p1Percent = totalVotes > 0 ? Math.round((room.votes.p1 / totalVotes) * 100) : 0;
  const xPercent = totalVotes > 0 ? Math.round((room.votes.x / totalVotes) * 100) : 0;
  const p2Percent = totalVotes > 0 ? Math.round((room.votes.p2 / totalVotes) * 100) : 0;

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: messages.length + 1,
        username: 'Вы',
        text: newMessage,
        timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        isOwn: true
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const handleVote = (vote: 'p1' | 'x' | 'p2') => {
    setUserVote(vote);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="hover:bg-primary/10"
            >
              <Icon name="ArrowLeft" size={20} className="mr-2" />
              Назад
            </Button>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <img src={room.team1Logo} alt={room.team1} className="w-10 h-10 object-contain" />
                <h1 className="text-xl font-bold">{room.team1}</h1>
              </div>
              
              <span className="text-2xl font-bold text-muted-foreground">VS</span>
              
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-bold">{room.team2}</h1>
                <img src={room.team2Logo} alt={room.team2} className="w-10 h-10 object-contain" />
              </div>
            </div>

            <div className="flex items-center gap-2 bg-secondary/10 px-3 py-1.5 rounded-md">
              <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
              <span className="text-secondary font-semibold text-sm">{room.onlineCount} онлайн</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          <div className="lg:col-span-2">
            <Card className="h-[calc(100vh-200px)] flex flex-col bg-card/90 backdrop-blur-sm border-border/50">
              <div className="p-4 border-b border-border/50">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Icon name="MessageSquare" size={24} className="text-primary" />
                  Чат комната
                </h2>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                        msg.isOwn
                          ? 'bg-primary text-primary-foreground rounded-br-none'
                          : 'bg-muted text-foreground rounded-bl-none'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm">{msg.username}</span>
                        <span className="text-xs opacity-70">{msg.timestamp}</span>
                      </div>
                      <p className="text-sm">{msg.text}</p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-4 border-t border-border/50">
                <div className="flex gap-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Написать сообщение..."
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSendMessage}
                    className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                  >
                    <Icon name="Send" size={20} />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-4">
            <Card className="p-6 bg-card/90 backdrop-blur-sm border-border/50">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Icon name="BarChart3" size={20} className="text-secondary" />
                Прогнозы
              </h3>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-semibold">Победа {room.team1}</span>
                    <span className="text-sm font-bold text-primary">{p1Percent}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-500"
                      style={{ width: `${p1Percent}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-semibold">Ничья</span>
                    <span className="text-sm font-bold text-secondary">{xPercent}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-secondary to-secondary/80 transition-all duration-500"
                      style={{ width: `${xPercent}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-semibold">Победа {room.team2}</span>
                    <span className="text-sm font-bold text-accent">{p2Percent}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-accent to-accent/80 transition-all duration-500"
                      style={{ width: `${p2Percent}%` }}
                    />
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card/90 backdrop-blur-sm border-border/50">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Icon name="Vote" size={20} className="text-accent" />
                Ваш прогноз
              </h3>
              
              <div className="space-y-2">
                <Button
                  onClick={() => handleVote('p1')}
                  className={`w-full justify-between ${
                    userVote === 'p1'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-primary/10 text-foreground hover:bg-primary/20'
                  }`}
                  variant="outline"
                >
                  <span>П1 - {room.team1}</span>
                  {userVote === 'p1' && <Icon name="Check" size={20} />}
                </Button>
                
                <Button
                  onClick={() => handleVote('x')}
                  className={`w-full justify-between ${
                    userVote === 'x'
                      ? 'bg-secondary text-secondary-foreground'
                      : 'bg-secondary/10 text-foreground hover:bg-secondary/20'
                  }`}
                  variant="outline"
                >
                  <span>Х - Ничья</span>
                  {userVote === 'x' && <Icon name="Check" size={20} />}
                </Button>
                
                <Button
                  onClick={() => handleVote('p2')}
                  className={`w-full justify-between ${
                    userVote === 'p2'
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-accent/10 text-foreground hover:bg-accent/20'
                  }`}
                  variant="outline"
                >
                  <span>П2 - {room.team2}</span>
                  {userVote === 'p2' && <Icon name="Check" size={20} />}
                </Button>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-sm border-primary/20">
              <div className="text-center">
                <Icon name="Trophy" size={40} className="mx-auto mb-3 text-accent" />
                <h3 className="text-lg font-bold mb-2">Матч начнётся через</h3>
                <div className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  02:45:30
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
