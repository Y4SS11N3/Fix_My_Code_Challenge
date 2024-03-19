#include "lists.h"
#include <stdlib.h>

/**
 * delete_dnodeint_at_index - Delete a node at a specific index from a list
 *
 * @head: A pointer to the first element of a list
 * @index: The index of the node to delete
 *
 * Return: 1 on success, -1 on failure
 */
int delete_dnodeint_at_index(dlistint_t **head, unsigned int index)
{
	dlistint_t *current, *previous;

	if (!*head || !index)
		return (-1);

	current = *head;
	previous = NULL;

	while (index--)
	{
		if (!current)
			return (-1);
		previous = current;
		current = current->next;
	}

	if (previous)
		previous->next = current->next;
	else
		*head = current->next;

	free(current);

	return (1);
}
