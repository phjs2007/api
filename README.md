/games/rpg (Serve para filtrar e pega so jogos com o gênero "RPG")
/games/todos(Serve para pegar todos jogos guardados no banco de dados)
/games/recentes(Filtra os jogos pela data de lançamento)
/games/create(Adiciona mais um jogo ao banco de dados (
model Json {
                  
  name                  
  price                 
  desconto             
  title                 
  description           
  destaque              
  vendido               
  highlightsTitle       
  highlights            
  closingDescription    
  finalNote             
  genre                 
  plataforma            
  lancamento            
  empresa               
  size                  
  rawgImageUrl          
  giantbombImageUrl     
  requirements          
}

model Highlight {
  id          
  title       
  description 
  gameId      
  game
}

model Requirements {
  id          
  system      
  processor   
  memory      
  graphics    
  directX    
  storage     
  other      
  gameId      
  game       
}
)

/games/update/{id} (Modifica algun jogo pelo id)
/games/vendidos (Filtra todos os jogos que tiverem vendido com true)
/games/destaques (Filtra todos os jogos que tiverem destaque com true)
