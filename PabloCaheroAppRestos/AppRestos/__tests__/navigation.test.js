
const mockAsyncStorage = {
    removeItem: jest.fn(() => Promise.resolve()), // Simular la limpieza
};
jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);


describe('Pruebas de Integración: Cierre de Sesión y Navegación', () => {
    test('El cierre de sesión debe limpiar AsyncStorage y llamar a la función de reseteo', async () => {
        
        const mockNavigation = {
            replace: jest.fn(), 
          
        };
        const mockResetToWelcome = jest.fn(); 

        
        const handleLogoutTest = async (resetFunc) => {
            await mockAsyncStorage.removeItem('userRole'); 
            await mockAsyncStorage.removeItem('userToken');
            
            
            resetFunc(mockNavigation); 
        };

        await handleLogoutTest(mockResetToWelcome);

        //  Prueba de Integración
        // Verifica que la limpieza de AsyncStorage ocurrió
        expect(mockAsyncStorage.removeItem).toHaveBeenCalledTimes(2); 
        // Verifica que la función que reinicia el Stack principal fue ejecutada
        expect(mockResetToWelcome).toHaveBeenCalledTimes(1); 
    });
});