
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {

  SettingsIcon,
} from "lucide-react";


export default function Radio() {
    return( <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Configurações</h1>
        <p className="text-muted-foreground">
          Configure as opções do sistema
        </p>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SettingsIcon className="h-5 w-5 text-primary" />
            Em desenvolvimento
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            O módulo de configurações está em desenvolvimento. 
            Em breve você poderá gerenciar usuários, permissões, 
            e outras configurações do sistema.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
