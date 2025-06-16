import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerClose,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer" // caminho depende do seu projeto

function MyComponent() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Abrir Drawer
        </button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Título da Drawer</DrawerTitle>
          <DrawerDescription>Descrição breve aqui.</DrawerDescription>
        </DrawerHeader>

        <div className="p-4">
          <p>Conteúdo principal da drawer...</p>
        </div>

        <DrawerFooter>
          <DrawerClose asChild>
            <button className="w-full bg-red-500 text-white py-2 rounded">
              Fechar
            </button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default MyComponent;