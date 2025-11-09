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
}

const mockRooms: Room[] = [
  { id: 1, team1: 'Манчестер Сити', team2: 'Арсенал', team1Icon: '🔵', team2Icon: '🔴', onlineCount: 247 },
  { id: 2, team1: 'Реал Мадрид', team2: 'Барселона', team1Icon: '⚪', team2Icon: '🔵', onlineCount: 532 },
  { id: 3, team1: 'Бавария', team2: 'Боруссия', team1Icon: '🔴', team2Icon: '🟡', onlineCount: 189 },
  { id: 4, team1: 'ПСЖ', team2: 'Марсель', team1Icon: '🔵', team2Icon: '⚪', onlineCount: 312 },
  { id: 5, team1: 'Ливерпуль', team2: 'Челси', team1Icon: '🔴', team2Icon: '🔵', onlineCount: 428 },
  { id: 6, team1: 'Милан', team2: 'Интер', team1Icon: '🔴', team2Icon: '🔵', onlineCount: 276 },
];

export default function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleAuth = () => {
    if (username && password) {
      setIsLoggedIn(true);
      setShowAuthDialog(false);
      setUsername('');
      setPassword('');
      setEmail('');
    }
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockRooms.map((room, index) => (
            <Card 
              key={room.id}
              onClick={() => handleRoomClick(room.id)}
              className="p-6 bg-card/90 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 animate-scale-in group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="bg-primary/10 px-3 py-1 rounded-full">
                  <span className="text-primary font-bold text-sm">КОМНАТА {room.id}</span>
                </div>
                <div className="flex items-center gap-2 bg-secondary/10 px-3 py-1 rounded-full">
                  <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
                  <span className="text-secondary font-semibold text-sm">{room.onlineCount} online</span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-6">
                <div className="text-center flex-1">
                  <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">{room.team1Icon}</div>
                  <h3 className="font-bold text-sm">{room.team1}</h3>
                </div>
                
                <div className="text-3xl font-bold text-muted-foreground mx-4">VS</div>
                
                <div className="text-center flex-1">
                  <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">{room.team2Icon}</div>
                  <h3 className="font-bold text-sm">{room.team2}</h3>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <Button 
                  variant="outline" 
                  className="bg-primary/10 border-primary/30 hover:bg-primary hover:text-primary-foreground font-bold transition-all"
                >
                  П1
                </Button>
                <Button 
                  variant="outline" 
                  className="bg-secondary/10 border-secondary/30 hover:bg-secondary hover:text-secondary-foreground font-bold transition-all"
                >
                  Х
                </Button>
                <Button 
                  variant="outline" 
                  className="bg-accent/10 border-accent/30 hover:bg-accent hover:text-accent-foreground font-bold transition-all"
                >
                  П2
                </Button>
              </div>
            </Card>
          ))}
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
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Введите email"
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
