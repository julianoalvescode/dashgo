import {
  Box,
  Flex,
  Heading,
  Button,
  Icon,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Checkbox,
  Text,
  useBreakpointValue,
  Spinner,
} from "@chakra-ui/react";
import { Header } from "components/Header";
import { Pagination } from "components/Pagination";
import { Sidebar } from "components/Sidebar";
import { RiAddLine, RiPencilLine } from "react-icons/ri";

import { formatDate } from "helpers";

import Link from "next/link";

import { useUser } from "hooks";
import { useState } from "react";

export default function UserList() {
  const [page, setPage] = useState(1);
  const { users, totalCount, isLoading, error, isFetching } = useUser({ page });

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />
        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading fontWeight="normal" size="lg">
              Usuários
              {!isLoading && isFetching && (
                <Spinner size="sm" color="gray.500" ml="4" />
              )}
            </Heading>
            <Link passHref href="/users/create">
              <Button
                cursor="pointer"
                as="a"
                fontSize="sm"
                size="sm"
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} />}
              >
                Criar novo
              </Button>
            </Link>
          </Flex>
          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Box flex="1">
              <Flex align="center">
                <Text>Falha ao obter os dados dos usuários.</Text>
              </Flex>
            </Box>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px={["4", "4", "6"]} color="gray.300" width="8">
                      <Checkbox colorScheme="pink" />
                    </Th>
                    <Th>Usuário</Th>
                    {isWideVersion && <Th>Data de cadastro</Th>}
                    <Th width="8"></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {users?.map((item, index) => (
                    <Tr key={index}>
                      <Td px={["4", "4", "6"]}>
                        <Checkbox colorScheme="pink" />
                      </Td>
                      <Td>
                        <Box>
                          <Text fontWeight="bold">{item.name}</Text>
                          <Text fontSize="small" color="gray.300">
                            {item.email}
                          </Text>
                        </Box>
                      </Td>
                      {isWideVersion && (
                        <Td>
                          {formatDate({
                            date: item.createdAt || new Date(),
                            props: { format: "Pp" },
                          })}
                        </Td>
                      )}
                      {isWideVersion && (
                        <Td>
                          <Button
                            cursor="pointer"
                            as="a"
                            fontSize="16"
                            size="sm"
                            colorScheme="purple"
                            leftIcon={<Icon as={RiPencilLine} />}
                          >
                            Editar
                          </Button>
                        </Td>
                      )}
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              <Pagination
                totalCountOfRegisters={totalCount}
                currentPage={page}
                onPageChange={setPage}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
