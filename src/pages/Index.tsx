import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

interface Room {
  id: number;
  team1: string;
  team2: string;
  team1Icon: string;
  team2Icon: string;
  onlineCount: number;
  votes: {
    p1: number;
    x: number;
    p2: number;
  };
}

const mockRooms: Room[] = [
  { id: 1, team1: 'Манчестер Сити', team2: 'Арсенал', team1Icon: '🔵', team2Icon: '🔴', onlineCount: 247, votes: { p1: 124, x: 45, p2: 78 } },
  { id: 2, team1: 'Реал Мадрид', team2: 'Барселона', team1Icon: '⚪', team2Icon: '🔵', onlineCount: 532, votes: { p1: 234, x: 98, p2: 200 } },
  { id: 3, team1: 'Бавария', team2: 'Боруссия', team1Icon: '🔴', team2Icon: '🟡', onlineCount: 189, votes: { p1: 95, x: 32, p2: 62 } },
  { id: 4, team1: 'ПСЖ', team2: 'Марсель', team1Icon: '🔵', team2Icon: '⚪', onlineCount: 312, votes: { p1: 156, x: 67, p2: 89 } },
  { id: 5, team1: 'Ливерпуль', team2: 'Челси', team1Icon: '🔴', team2Icon: '🔵', onlineCount: 428, votes: { p1: 198, x: 89, p2: 141 } },
  { id: 6, team1: 'Милан', team2: 'Интер', team1Icon: '🔴', team2Icon: '🔵', onlineCount: 276, votes: { p1: 132, x: 54, p2: 90 } },
];

export default function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [userVotes, setUserVotes] = useState<{[key: number]: 'p1' | 'x' | 'p2'}>({});

  const handleAuth = () => {
    if (username && password && (!isRegistering || phone)) {
      setIsLoggedIn(true);
      setShowAuthDialog(false);
      setUsername('');
      setPassword('');
      setPhone('');
    }
  };

  const handleVote = (roomId: number, vote: 'p1' | 'x' | 'p2', e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLoggedIn) {
      setUserVotes(prev => ({...prev, [roomId]: vote}));
    } else {
      setShowAuthDialog(true);
    }
  };

  const calculatePercentage = (votes: number, total: number) => {
    return total > 0 ? Math.round((votes / total) * 100) : 0;
  };

  const handleRoomClick = (roomId: number) => {
    if (!isLoggedIn) {
      setShowAuthDialog(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center animate-pulse-glow">
              <span className="text-2xl">⚽</span>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              ФУТБОЛ ГУРУ
            </h1>
          </div>
          
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-lg border border-border">
                <Icon name="User" size={20} className="text-primary" />
                <span className="font-medium">Пользователь</span>
              </div>
              <Button 
                variant="outline" 
                onClick={() => setIsLoggedIn(false)}
                className="hover:bg-destructive hover:text-destructive-foreground transition-all"
              >
                Выход
              </Button>
            </div>
          ) : (
            <Button 
              onClick={() => setShowAuthDialog(true)}
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all font-semibold"
            >
              <Icon name="LogIn" size={18} className="mr-2" />
              Войти
            </Button>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Выберите Комнату Матча
          </h2>
          <p className="text-muted-foreground text-lg">
            Присоединяйтесь к обсуждению и делайте прогнозы на исход матча
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 max-w-4xl">
          {mockRooms.map((room, index) => {
            const totalVotes = room.votes.p1 + room.votes.x + room.votes.p2;
            const p1Percent = calculatePercentage(room.votes.p1, totalVotes);
            const xPercent = calculatePercentage(room.votes.x, totalVotes);
            const p2Percent = calculatePercentage(room.votes.p2, totalVotes);
            
            return (
              <Card 
                key={room.id}
                onClick={() => handleRoomClick(room.id)}
                className="p-4 bg-card/90 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 cursor-pointer hover:shadow-xl hover:shadow-primary/10 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="bg-primary/10 px-2 py-1 rounded-md shrink-0">
                      <span className="text-primary font-bold text-xs">КОМНАТА {room.id}</span>
                    </div>
                    
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-2xl shrink-0">{room.team1Icon}</span>
                        <span className="font-semibold text-sm truncate">{room.team1}</span>
                      </div>
                      
                      <span className="text-muted-foreground font-bold text-sm shrink-0">VS</span>
                      
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-2xl shrink-0">{room.team2Icon}</span>
                        <span className="font-semibold text-sm truncate">{room.team2}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 bg-secondary/10 px-2 py-1 rounded-md shrink-0">
                      <div className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse"></div>
                      <span className="text-secondary font-semibold text-xs">{room.onlineCount}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 shrink-0">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={(e) => handleVote(room.id, 'p1', e)}
                      className={`w-20 h-8 text-xs font-bold transition-all ${
                        userVotes[room.id] === 'p1' 
                          ? 'bg-primary text-primary-foreground border-primary' 
                          : 'bg-primary/10 border-primary/30 hover:bg-primary hover:text-primary-foreground'
                      }`}
                    >
                      П1 {p1Percent}%
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={(e) => handleVote(room.id, 'x', e)}
                      className={`w-20 h-8 text-xs font-bold transition-all ${
                        userVotes[room.id] === 'x' 
                          ? 'bg-secondary text-secondary-foreground border-secondary' 
                          : 'bg-secondary/10 border-secondary/30 hover:bg-secondary hover:text-secondary-foreground'
                      }`}
                    >
                      Х {xPercent}%
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={(e) => handleVote(room.id, 'p2', e)}
                      className={`w-20 h-8 text-xs font-bold transition-all ${
                        userVotes[room.id] === 'p2' 
                          ? 'bg-accent text-accent-foreground border-accent' 
                          : 'bg-accent/10 border-accent/30 hover:bg-accent hover:text-accent-foreground'
                      }`}
                    >
                      П2 {p2Percent}%
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {!isLoggedIn && (
          <div className="mt-12 text-center animate-fade-in">
            <Card className="max-w-md mx-auto p-8 bg-gradient-to-br from-card to-muted/50 border-primary/20">
              <Icon name="Info" size={48} className="mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-bold mb-2">Войдите для участия</h3>
              <p className="text-muted-foreground mb-4">
                Зарегистрируйтесь или войдите, чтобы делать прогнозы и участвовать в обсуждениях
              </p>
              <Button 
                onClick={() => setShowAuthDialog(true)}
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 w-full font-semibold"
              >
                Присоединиться сейчас
              </Button>
            </Card>
          </div>
        )}
      </main>

      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent className="sm:max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {isRegistering ? 'Регистрация' : 'Вход'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            <div>
              <Label htmlFor="username">Имя пользователя</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Введите имя"
                className="mt-1"
              />
            </div>
            
            {isRegistering && (
              <div>
                <Label htmlFor="phone">Номер телефона</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+7 (___) ___-__-__"
                  className="mt-1"
                />
              </div>
            )}
            
            <div>
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Введите пароль"
                className="mt-1"
              />
            </div>

            <Button 
              onClick={handleAuth}
              className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 font-semibold"
            >
              {isRegistering ? 'Зарегистрироваться' : 'Войти'}
            </Button>

            <div className="text-center">
              <button
                onClick={() => setIsRegistering(!isRegistering)}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {isRegistering ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Зарегистрироваться'}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}